from django.urls import path
from catalog.views.category import CategoryListCreateView, CategoryDetailView
from catalog.views.car import CarModelListView, CarModelCreateView, CarModelDetailView, CarMoveView

app_name = "catalog"

urlpatterns = [
    # Category Endpoints
    
    # GET: all users, POST: admin
    path("categories/", CategoryListCreateView.as_view(), name="category_list"),  
    
    # GET/PUT/PATCH/DELETE: admin only
    path("categories/<uuid:id>/", CategoryDetailView.as_view(), name="category_detail"),  

    
    # Car Endpoints
    
    # GET: all users
    path("cars/", CarModelListView.as_view(), name="car_list"),  
    
    # POST: admin only
    path("cars/create/", CarModelCreateView.as_view(), name="car_create"),  
    
    # GET: all users, PUT/PATCH/DELETE: admin
    path("cars/<uuid:id>/", CarModelDetailView.as_view(), name="car_detail"),  

    # POST: admin moves car to another category
    path("cars/<uuid:id>/move/", CarMoveView.as_view(), name="car_move"),  
]
