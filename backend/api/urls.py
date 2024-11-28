from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import (
    signup,
    login,
    get_user_by_email,
    AddBookingView,
    BookingListView,
    UpdateBookingStatusView,
    WeatherForecastView,
    DestinationListView,
    DestinationCreateView, 
    DestinationDeleteView,
    DestinationDetailView,
    WishlistView,
    chat_view,
    #GeminiAIView,


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
    path('user-bookings/', views.get_user_bookings, name='get_user_bookings'),
    path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
    #path('ask/', GeminiAIView.as_view(), name='ask_open_gemini'),
    path("chat/", chat_view, name="chat_view"),

    path('destinations/', DestinationListView.as_view(), name='destination-list'),  # GET: list all destinations
    path('destinations/add/', DestinationCreateView.as_view(), name='destination-create'),  # POST: create a new destination
    path('destinations/delete/<int:pk>/', DestinationDeleteView.as_view(), name='destination-delete'),  # DELETE: delete a destination by ID
    path('destinations/<str:DestinationId>/', DestinationDetailView.as_view(), name='destination-detail'),  # New URL for specific destination

    path('wishlist/', WishlistView.as_view(), name='wishlist'),  # For listing and adding
    path('wishlist/<int:pk>/', WishlistView.as_view(), name='wishlist-detail'),  # For removing
    path('wishlist/check/', views.check_wishlist, name='check_wishlist'),

]

