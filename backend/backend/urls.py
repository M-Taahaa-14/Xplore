# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def root_view(request):
    return HttpResponse("Welcome to the root page!")

urlpatterns = [
    path('admin/', admin.site.urls),  # URL for Django admin
    path('', include('api.urls')),  # URL for your API views
    
]
