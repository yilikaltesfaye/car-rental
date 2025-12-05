from rest_framework import serializers
from datetime import date
from catalog.models.car import CarModel
from .models import Rental
from catalog.serializers.car import CarModelSerializer


class UserRentalSerializer(serializers.ModelSerializer):
    car = CarModelSerializer(read_only=True)
    car_id = serializers.PrimaryKeyRelatedField(
        queryset=CarModel.objects.all(), source="car", write_only=True
    )

    class Meta:
        model = Rental
        fields = ["id", "car", "car_id", "start_date", "end_date", "license_image", "status", "created_at"]

    def validate(self, data):
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        today = date.today()

        if start_date < today:
            raise serializers.ValidationError({"start_date": "Start date must be today or later."})

        if end_date <= today:
            raise serializers.ValidationError({"end_date": "End date must be after today."})

        if end_date <= start_date:
            raise serializers.ValidationError({"end_date": "End date must be after start date."})

        return data


class AdminRentalSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    car = CarModelSerializer(read_only=True)

    class Meta:
        model = Rental
        fields = ["id", "user", "car", "start_date", "end_date", "license_image", "status", "created_at"]
