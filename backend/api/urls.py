# backend/api/urls.py
from django.urls import path
from .views import signup


urlpatterns = [
    path('', signup),  # This will handle signup
]
