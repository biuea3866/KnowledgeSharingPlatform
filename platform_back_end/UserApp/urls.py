from django.urls import path;
from .views import CheckEmailView, CheckNicknameView, LoginView, LogoutView, RegisterView, ResurrectView, UserView, UsersView, ModifyView, DeleteView;

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('check/email/<str:email>', CheckEmailView.as_view()),
    path('check/nickname/<str:nickname>', CheckNicknameView.as_view()),
    path('login', LoginView.as_view()),
    path('', UsersView.as_view()),
    path('get-user', UserView.as_view()),
    path('modify', ModifyView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteView.as_view()),
    path('resurrect', ResurrectView.as_view())
]