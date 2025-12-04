import os
import uuid
from django.db import models
from .category import Category


class CarModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="cars"
    )

    model_name = models.CharField(max_length=255)
    daily_price = models.DecimalField(max_digits=10, decimal_places=2)

    total_count = models.PositiveIntegerField(default=0)
    available = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.model_name} ({self.category.name})"


def car_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    # Filename: <car_model_id>_<uuid>.ext
    filename = f"{instance.car_model.id}_{uuid.uuid4().hex}.{ext}"
    return os.path.join("cars", filename)


class CarImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    car_model = models.ForeignKey(
        CarModel,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image = models.ImageField(upload_to=car_image_upload_path)

    def __str__(self):
        return f"Image for {self.car_model.model_name}"
