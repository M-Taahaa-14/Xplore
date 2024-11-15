# backend/api/serializers.py
from rest_framework import serializers  # Correct import for serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'gender', 'phone_num', 'dob', 'email', 'password']

from rest_framework import serializers
from .models import Destination, Tour, Booking

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'