from rest_framework import serializers
from catalog.models.car import CarModel, CarImage
from catalog.models.category import Category


# Serializer for individual images
class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ["id", "image"]

class BasicCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]

# Serializer for listing / retrieving car models
class CarModelSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)
    
    # 🛑 FIX HERE 🛑: Changed CategorySerializer to BasicCategorySerializer
    category = BasicCategorySerializer(read_only=True) 
    
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
            "total_count",
            "available",
            "images",
        ]


# Serializer for creating/updating car models with images
class CarModelCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category"
    )

    class Meta:
        model = CarModel
        fields = [
            "id",
            "category_id",
            "model_name",
            "daily_price",
            "total_count",
            "available",
            "images",
        ]

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        car_model = CarModel.objects.create(**validated_data)
        for image in images_data:
            CarImage.objects.create(car_model=car_model, image=image)
        return car_model

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Optionally add new images
        for image in images_data:
            CarImage.objects.create(car_model=instance, image=image)
        return instance