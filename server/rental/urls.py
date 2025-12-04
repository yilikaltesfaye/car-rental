from django.urls import path
from .views import UserRentalListCreateView, AdminRentalListView, AdminRentalReturnView

app_name = "rental"

urlpatterns = [
    # User rentals
    path("me", UserRentalListCreateView.as_view(), name="user_rentals"),  

    # Admin rentals
    path("", AdminRentalListView.as_view(), name="all_rentals"),  
    # GET /rentals/
    # GET /rentals/?user_id=123e4567-e89b-12d3-a456-426614174000
    # GET /rentals/?status=rented
    # GET /rentals/?status=returned
    # GET /rentals/?start_date=2025-12-01&end_date=2025-12-31
    # GET /rentals/?user_id=123e4567-e89b-12d3-a456-426614174000&status=rented&start_date=2025-12-01&end_date=2025-12-31



    path("<uuid:id>/return", AdminRentalReturnView.as_view(), name="rental_return"),  
]
