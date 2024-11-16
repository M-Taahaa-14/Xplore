# urls.py
from django.urls import path
from .views import (
    signup,
    login,
    get_user_by_email,
    AddBookingView,
    UpdateBookingStatusView,
    WeatherForecastView,
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('user-profile/', get_user_by_email, name='get-user-by-email'),
    path('bookings/add/', AddBookingView.as_view(), name='add-booking'),
    path('bookings/status/', UpdateBookingStatusView.as_view(), name='update-booking-status'),
    path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
]
