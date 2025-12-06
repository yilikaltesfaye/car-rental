from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.utils.dateparse import parse_date
from account.models import User
from rental.models import Rental
from adminpanel.serializers import AdminRentalSummarySerializer
from account.permissions import IsAdminOrSuperuser

class AdminRentalSummaryView(generics.GenericAPIView):
    """
    Admin endpoint: returns rental summary for all users.
    Supports filtering by user_id, rental status, start_date, and end_date.
    """
    serializer_class = AdminRentalSummarySerializer
    permission_classes = [IsAdminOrSuperuser]

    def get(self, request, *args, **kwargs):
        rentals = Rental.objects.all()
        params = request.query_params

        user_id = params.get("user_id")
        if user_id:
            rentals = rentals.filter(user_id=user_id)

        status_filter = params.get("status")
        if status_filter in ["rented", "returned"]:
            rentals = rentals.filter(status=status_filter)

        start_date = params.get("start_date")
        if start_date:
            parsed_start = parse_date(start_date)
            if parsed_start:
                rentals = rentals.filter(start_date__gte=parsed_start)

        end_date = params.get("end_date")
        if end_date:
            parsed_end = parse_date(end_date)
            if parsed_end:
                rentals = rentals.filter(end_date__lte=parsed_end)

        users = User.objects.filter(rentals__in=rentals).distinct()
        summary_list = []

        for user in users:
            user_rentals = rentals.filter(user=user)
            rental_data = [
                {
                    "rental_id": rental.id,
                    "car_model": rental.car.model_name,
                    "start_date": rental.start_date,
                    "end_date": rental.end_date,
                    "status": rental.status
                }
                for rental in user_rentals
            ]

            summary_list.append({
                "user_id": user.id,
                "username": user.username,
                "full_name": user.full_name,
                "total_rentals": user_rentals.count(),
                "rentals": rental_data
            })

        serializer = self.get_serializer(summary_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
