from django.contrib import admin
from .models.car import CarModel, CarImage
from .models.category import Category

admin.site.register(CarModel)
admin.site.register(CarImage)
admin.site.register(Category)


