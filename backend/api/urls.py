from django.urls import path
from .views import (
    signup,
    login,
    get_user_by_email,
    AddBookingView,
    BookingListView,
    UpdateBookingStatusView,
    WeatherForecastView,
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('user-profile/', get_user_by_email, name='get-user-by-email'),
    path('bookings/add/', AddBookingView.as_view(), name='add-booking'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
    path('bookings/status/<int:booking_id>/', UpdateBookingStatusView.as_view(), name='update-booking-status'),  # Corrected URL pattern
    path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
]
