# Create your views here.
from rest_framework import generics, permissions
from .serializers import UserSignupSerializer
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status


# Signup
class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims
        token['full_name'] = user.full_name
        token['address'] = user.address
        token['phone'] = user.phone
        token['role'] = 'admin' if user.is_superuser else 'user'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add user info to response
        data['user'] = {
            "username": self.user.username,
            "full_name": self.user.full_name,
            "address": self.user.address,
            "phone": self.user.phone,
            "role": 'admin' if self.user.is_superuser else 'user'
        }
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data

        response = Response(
            {
                "message": "Login successful",
                "access_token": tokens['access'],
                "user": tokens['user']
            },
            status=status.HTTP_200_OK
        )

        # Set refresh token in cookie only
        refresh = tokens['refresh']
        response.set_cookie(
            key='refresh_token',
            value=refresh,
            httponly=True,
            max_age=7*24*60*60,  # 7 days
            samesite='Lax'
        )

        return response
