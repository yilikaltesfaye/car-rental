from django.urls import path
from .views.auth import (
    UserSignupView,
    MyTokenObtainPairView,
    CookieTokenRefreshView,
    logout_view,
)

app_name = "user"

urlpatterns = [
    # Signup → auto-login
    path("signup", UserSignupView.as_view(), name="signup"),

    # Login → access + refresh tokens
    path("login", MyTokenObtainPairView.as_view(), name="login"),

    # Refresh access token using refresh token in cookie
    path("refresh-token", CookieTokenRefreshView.as_view(), name="token_refresh"),

    # Logout → blacklist refresh token + delete cookie
    path("logout", logout_view, name="logout"),
]
