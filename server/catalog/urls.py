from django.urls import path
from catalog.views.category import CategoryListCreateView, CategoryDetailView
from catalog.views.car import CarModelListView, CarModelCreateView, CarModelDetailView, CarMoveView

app_name = "catalog"

urlpatterns = [
    # Category Endpoints
    
    # admin only
    path("categories", CategoryListCreateView.as_view(), name="category_list"),  
    path("categories/<uuid:id>", CategoryDetailView.as_view(), name="category_detail"),  

    
    # Car 
    path("cars", CarModelListView.as_view(), name="car_list"),  
    
    # admin only
    path("cars/create", CarModelCreateView.as_view(), name="car_create"),  
    path("cars/<uuid:id>", CarModelDetailView.as_view(), name="car_detail"), 
    path("cars/<uuid:id>/move", CarMoveView.as_view(), name="car_move"),  
]
