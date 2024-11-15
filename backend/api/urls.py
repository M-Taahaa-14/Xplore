from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    signup,
    login,
    UserProfileView,
    WeatherForecastView,
    get_weather,
    DestinationViewSet,
    TourViewSet,
    BookingViewSet,
    get_user_by_email
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'destinations', DestinationViewSet, basename='destination')
router.register(r'tours', TourViewSet, basename='tour')
router.register(r'bookings', BookingViewSet, basename='booking')

# Define urlpatterns
urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('user-profile/', get_user_by_email),  # Secured with authentication
    path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
    path('get-weather/', get_weather),

    # Include routes managed by the router
    path('', include(router.urls)),
]


# from django.urls import path
# from .views import signup, login, UserProfileView, WeatherForecastView, get_weather

# urlpatterns = [
#     path('signup', signup),
#     path('login/', login),
#     path('user-profile/', UserProfileView.as_view()),  # Secured with authentication
#     path('weather/', WeatherForecastView.as_view(), name='weather-forecast'),
#     path('get-weather/', get_weather),  # A simpler version of weather API
# ]
