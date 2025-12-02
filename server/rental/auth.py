from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta
from django.conf import settings
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
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
