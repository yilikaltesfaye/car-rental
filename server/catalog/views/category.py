from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from account.permissions import IsAdminOrSuperuser
from catalog.models.category import Category
from catalog.serializers.category import CategorySerializer

# List all categories (all users) and create new category (admin only)
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminOrSuperuser()]
        return [IsAuthenticated()]



class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrSuperuser]
    lookup_field = "id"
