from rest_framework import serializers
from .models import Rental
from catalog.serializers.car import CarModelSerializer

class UserRentalSerializer(serializers.ModelSerializer):
    car = CarModelSerializer(read_only=True)
    car_id = serializers.PrimaryKeyRelatedField(
        queryset=CarModel.objects.all(), source="car", write_only=True
    )

    class Meta:
        model = Rental
        fields = ["id", "car", "car_id", "start_date", "end_date", "license_image", "status"]

class AdminRentalSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    car = CarModelSerializer(read_only=True)

    class Meta:
        model = Rental
        fields = ["id", "user", "car", "start_date", "end_date", "license_image", "status", "created_at"]
