from django.urls import path
from adminpanel.views import AdminRentalSummaryView

app_name = "adminpanel"

urlpatterns = [
    # GET: Admin rental summary
    # Optional query params: user_id, status, start_date, end_date
    path("summary", AdminRentalSummaryView.as_view(), name="rental_summary"),
]
# Get all rentals summary
# GET /api/admin_panel/rental-summary/

# Filter by user
# GET /api/admin_panel/rental-summary/?user_id=<user_uuid>

# Filter by status
# GET /api/admin_panel/rental-summary/?status=rented

# Filter by date range
# GET /api/admin_panel/rental-summary/?start_date=2025-12-01&end_date=2025-12-31

# Combine filters
# GET /api/admin_panel/rental-summary/?user_id=<user_uuid>&status=returned&start_date=2025-12-01
