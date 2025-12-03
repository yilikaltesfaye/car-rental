from django.utils.dateparse import parse_date
from django.contrib.auth import get_user_model
from account.permissions import IsAdminOrSuperuser
from .serializers import AdminRentalSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Rental
from .serializers import UserRentalSerializer

User = get_user_model()

class UserRentalListCreateView(generics.ListCreateAPIView):
    serializer_class = UserRentalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rental.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        car = serializer.validated_data["car"]
        if car.available_stock <= 0:
            raise serializers.ValidationError("Car not available for rent")
        car.available_stock -= 1
        car.save()
        serializer.save(user=self.request.user)


class AdminRentalReturnView(generics.UpdateAPIView):
    serializer_class = AdminRentalSerializer
    permission_classes = [IsAdminOrSuperuser]
    queryset = Rental.objects.all()
    lookup_field = "id"

    def patch(self, request, *args, **kwargs):
        rental = self.get_object()
        if rental.status == "returned":
            return Response({"detail": "Rental already returned"}, status=status.HTTP_400_BAD_REQUEST)
        rental.status = "returned"
        rental.car.available_stock += 1
        rental.car.save()
        rental.save()
        serializer = self.get_serializer(rental)
        return Response(serializer.data, status=status.HTTP_200_OK)



class AdminRentalListView(generics.ListAPIView):
    serializer_class = AdminRentalSerializer
    permission_classes = [IsAdminOrSuperuser]

    def get_queryset(self):
        queryset = Rental.objects.all()
        params = self.request.query_params

        # Filter by user ID
        user_id = params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)

        # Filter by status (rented/returned)
        status = params.get("status")
        if status in ["rented", "returned"]:
            queryset = queryset.filter(status=status)

        # Filter by start_date >=
        start_date = params.get("start_date")
        if start_date:
            parsed_start = parse_date(start_date)
            if parsed_start:
                queryset = queryset.filter(start_date__gte=parsed_start)

        # Filter by end_date <=
        end_date = params.get("end_date")
        if end_date:
            parsed_end = parse_date(end_date)
            if parsed_end:
                queryset = queryset.filter(end_date__lte=parsed_end)

        return queryset
