from account.serializers import UserSignupSerializer
from account.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions, status, exceptions, response
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# -------------------------------
# Signup → auto-login
# -------------------------------
class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Issue tokens
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        user_data = {
            "username": user.username,
            "full_name": user.full_name,
            "address": user.address,
            "phone": user.phone,
            "id": user.id,
            "role": "admin" if user.is_superuser else "user"
        }

        res = Response(
            {
                "message": "Signup successful",
                "access_token": access,
                "user": user_data
            },
            status=status.HTTP_201_CREATED
        )

        # Set refresh token in httpOnly cookie only
        res.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            max_age=7*24*60*60,  # 7 days
            samesite='Lax'
        )
        return res


# -------------------------------
# Login → access token + cookie refresh
# -------------------------------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.full_name
        token['address'] = user.address
        token['phone'] = user.phone
        token['role'] = "admin" if user.is_superuser else "user"
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            "username": self.user.username,
            "full_name": self.user.full_name,
            "address": self.user.address,
            "phone": self.user.phone,
            "id": self.user.id,
            "role": "admin" if self.user.is_superuser else "user"
        }
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data

        user_data = tokens['user']
        access = tokens['access']
        refresh = tokens['refresh']

        res = Response(
            {
                "message": "Login successful",
                "access_token": access,
                "user": user_data
            },
            status=status.HTTP_200_OK
        )

        # Set refresh token in httpOnly cookie only
        res.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            max_age=7*24*60*60,
            samesite='Lax'
        )
        return res


# -------------------------------
# Refresh access token only
# -------------------------------
class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if not attrs['refresh']:
            raise exceptions.AuthenticationFailed("No refresh token in cookies")
        data = super().validate(attrs)

        # Add user info
        try:
            user_id = RefreshToken(attrs['refresh']).payload['user_id']
            user = User.objects.get(id=user_id)
            data['user'] = {
                "username": user.username,
                "full_name": user.full_name,
                "address": user.address,
                "phone": user.phone,
                'id': user.id,
                "role": "admin" if user.is_superuser else "user"
            }
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("User not found")

        return data


class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        # Refresh token remains in cookie, not in body
        return super().finalize_response(request, response, *args, **kwargs)


# -------------------------------
# Logout → blacklist refresh token
# -------------------------------
@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        res = response.Response(
            {"message": "Logged out"},
            status=status.HTTP_200_OK
        )
        res.delete_cookie("refresh_token")
        return res
    except Exception:
        raise exceptions.ParseError("Invalid refresh token")
