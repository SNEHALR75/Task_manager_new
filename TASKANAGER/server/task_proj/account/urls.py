from django.urls import path
from account.api import *


urlpatterns = [
    path('signup/',SignUpView.as_view()),
    path('account/activate/<token>/',AccountActivationView.as_view()),
    path('signin/',SignInView.as_view() ),
    path('logout/',LogoutView.as_view() ),
	path('refresh/',CookieTokenRefreshView.as_view()),

    path('user/info/',UserInfoView.as_view()),
    path('user/tasks/<pk>/',UserTasksView.as_view()),
   
]