# backend/api/urls.py

from django.urls import path
from .views import signup, login, user_profile, WeatherForecastView

urlpatterns = [
    path('signup/', signup),
<<<<<<< HEAD
    path('login/', login),  
=======
    path('login/', login),
    path('user-profile/', user_profile),  # New endpoint for user profile
    path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
>>>>>>> 1e2973fcbfd6be9545f9f536e1b01447c9effb71
]
