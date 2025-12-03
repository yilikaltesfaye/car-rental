from rest_framework import serializers
from catalog.models.car import CarModel, CarImage
from catalog.models.category import Category


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ["id", "image"]


class CarModelSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = CarModel
        fields = [
            "id",
            "category",
            "category_id",
            "model_name",
            "daily_price",
            "total_stock",
            "available_stock",
            "images",
        ]
