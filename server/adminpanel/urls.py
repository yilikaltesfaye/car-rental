from django.urls import path
from adminpanel.views import AdminRentalSummaryView

app_name = "adminpanel"

urlpatterns = [

    path("summary", AdminRentalSummaryView.as_view(), name="rental_summary"),
]
