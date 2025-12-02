from django.urls import path
from .views import UserSignupView, MyTokenObtainPairView

urlpatterns = [
    path("signup", UserSignupView.as_view(), name="signup"),
    path("login", MyTokenObtainPairView.as_view(), name="login"),
]
