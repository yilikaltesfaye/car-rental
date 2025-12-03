import uuid
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, full_name, phone, address, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username must be set")
        if not full_name:
            raise ValueError("The Full Name must be set")
        if not phone:
            raise ValueError("The Phone must be set")
        if not address:
            raise ValueError("The Address must be set")

        user = self.model(
            username=username,
            full_name=full_name,
            phone=phone,
            address=address,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, full_name, phone, address, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(
            username=username,
            full_name=full_name,
            phone=phone,
            address=address,
            password=password,
            **extra_fields
        )


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    full_name = models.CharField(max_length=255)
    address = models.TextField(max_length=255)
    phone = models.CharField(max_length=30)

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    email = None

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["full_name", "phone", "address"]

    objects = UserManager()

    def __str__(self):
        return self.username


class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="user_profile"
    )
    image = models.ImageField(upload_to="profile/", default="profile/avatar.png")
    about = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} Profile"


@receiver(post_save, sender=get_user_model())
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=get_user_model())
def save_user_profile(sender, instance, **kwargs):
    instance.user_profile.save()
