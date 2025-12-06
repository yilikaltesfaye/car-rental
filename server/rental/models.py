import os
import uuid
from django.db import models
from django.conf import settings
from catalog.models.car import CarModel


def license_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{instance.id}_{uuid.uuid4().hex}.{ext}"
    return os.path.join("licenses", filename)


class Rental(models.Model):
    STATUS_CHOICES = [
        ("rented", "Rented"),
        ("returned", "Returned"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="rentals")
    car = models.ForeignKey(CarModel, on_delete=models.CASCADE, related_name="rentals")
    start_date = models.DateField()
    end_date = models.DateField()
    license_image = models.ImageField(upload_to=license_image_upload_path, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="rented")
    delivery_address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.car.model_name} ({self.status})"
