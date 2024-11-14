from django.urls import path
from .views import signup, login, UserProfileView, WeatherForecastView, get_weather

urlpatterns = [
    path('signup', signup),
    path('login/', login),
    path('user-profile', UserProfileView.as_view()),  # Secured with authentication
    path('weather', WeatherForecastView.as_view(), name='weather-forecast'),
    path('get-weather', get_weather),  # A simpler version of weather API
]
