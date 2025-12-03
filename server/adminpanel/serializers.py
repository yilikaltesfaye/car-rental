from rest_framework import serializers
from rental.models import Rental

class AdminRentalSummarySerializer(serializers.Serializer):
    """
    Serializer for admin rental summary with optional filtering.
    """
    user_id = serializers.UUIDField()
    username = serializers.CharField()
    full_name = serializers.CharField()
    total_rentals = serializers.IntegerField()
    rentals = serializers.ListField(child=serializers.DictField())
