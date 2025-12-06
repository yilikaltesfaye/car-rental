from django.urls import path
from .views import UserRentalListCreateView, AdminRentalListView, AdminRentalReturnView

app_name = "rental"

urlpatterns = [
    # User 
    path("me", UserRentalListCreateView.as_view(), name="user_rentals"),  

    # Admin only
    path("", AdminRentalListView.as_view(), name="all_rentals"),  

    path("<uuid:id>/return", AdminRentalReturnView.as_view(), name="rental_return"),  
]
