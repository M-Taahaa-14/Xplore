from django.urls import path
from . import views
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
    path('user-profile/get', views.get_user_by_email, name='get-user-profile'),
    path('user-profile/update', views.update_user_profile, name='update-user-profile'),
    path('bookings/add/', AddBookingView.as_view(), name='add-booking'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
    path('bookings/status/<int:booking_id>/', UpdateBookingStatusView.as_view(), name='update-booking-status'),
    path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
]
