import uuid
from django.db import models
from django.conf import settings
from catalog.models.car import CarModel

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
    license_image = models.ImageField(upload_to="licenses/")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="rented")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.car.model_name} ({self.status})"
