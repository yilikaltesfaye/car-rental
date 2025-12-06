from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from account.models import User
from account.serializers import UserSerializer, AdminUserSerializer
from account.permissions import IsAdminOrSuperuser

# Authenticated user views
class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# Admin / Superuser views
class UserListView(generics.ListAPIView):
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAdminOrSuperuser]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAdminOrSuperuser]
    lookup_field = "id"
