from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password


class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ("username", "full_name", "password", "address", "phone")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            full_name=validated_data["full_name"],
            password=validated_data["password"],
            address=validated_data.get("address", ""),
            phone=validated_data.get("phone", ""),
        )
        return user
