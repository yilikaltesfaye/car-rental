from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from account.permissions import IsAdminOrSuperuser
from catalog.models.car import CarModel
from catalog.models.category import Category
from catalog.serializers.car import CarModelSerializer, CarModelCreateSerializer


# User + Admin: view cars
class CarModelListView(generics.ListAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [IsAuthenticated]


# Admin: create car model with multiple images
class CarModelCreateView(generics.CreateAPIView):
    queryset = CarModel.objects.all()
    serializer_class = CarModelCreateSerializer
    permission_classes = [IsAdminOrSuperuser]


# Admin + User read / Admin edit
class CarModelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarModel.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        # Use create/update serializer for admin edits, read serializer for others
        if self.request.method in ["PUT", "PATCH"]:
            return CarModelCreateSerializer
        return CarModelSerializer

    lookup_field = "id"


# Admin: move car from one category to another
class CarMoveView(generics.GenericAPIView):
    serializer_class = CarModelSerializer
    permission_classes = [IsAdminOrSuperuser]
    queryset = CarModel.objects.all()
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        car = self.get_object()
        category_id = request.data.get("category_id")

        if not category_id:
            return Response({"error": "category_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        car.category = new_category
        car.save()

        serializer = self.get_serializer(car)
        return Response({
            "message": "Car moved to new category",
            "car": serializer.data
        }, status=status.HTTP_200_OK)
