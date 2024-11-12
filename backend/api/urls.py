# backend/api/urls.py

from django.urls import path
from .views import signup, login, user_profile, WeatherForecastView

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('user-profile/', user_profile),  # New endpoint for user profile
     path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
]
