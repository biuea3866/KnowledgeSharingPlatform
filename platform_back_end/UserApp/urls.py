from django.urls import path;
from .views import LoginView, LogoutView, RegisterView, UserView, UsersView;

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('', UsersView.as_view()),
    path('get-user', UserView.as_view()),
    path('logout', LogoutView.as_view())
]