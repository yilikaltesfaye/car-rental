from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, full_name, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username must be set")
        if not full_name:
            raise ValueError("The Full Name must be set")
        user = self.model(username=username, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, full_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, full_name, password, **extra_fields)


class User(AbstractUser):
    full_name = models.CharField(max_length=255)  # required
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=30, blank=True)

    email = None  # completely remove email
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["full_name"]

    objects = UserManager()

    def __str__(self):
        return self.username
