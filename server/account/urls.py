from django.urls import path
from .views.auth import (
    UserSignupView,
    MyTokenObtainPairView,
    CookieTokenRefreshView,
    logout_view,
)
from .views.user import MeView, UserListView, UserDetailView


app_name = "user"

urlpatterns = [
    # Auth
    path("/signup", UserSignupView.as_view(), name="signup"),
    path("/login", MyTokenObtainPairView.as_view(), name="login"),
    path("/refresh-token", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("/logout", logout_view, name="logout"),

    # User
    path("/user/me", MeView.as_view(), name="user_me"),
    path("/user", UserListView.as_view(), name="user_list"),
    path("/user/<uuid:id>", UserDetailView.as_view(), name="user_detail"),

]
