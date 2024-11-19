# backend/api/serializers.py
from rest_framework import serializers  # Correct import for serializers
from .models import User
from .models import Booking 
from .models import Destination







class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'gender', 'phone_num', 'dob', 'email', 'password']



class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['BookingId', 'User', 'Tour', 'Departure', 'TravelDate', 'BookingDate', 'Status']  # Include BookingId in the fields
        read_only_fields = ['BookingId', 'BookingDate']  # BookingId and BookingDate should be read-only



class BookingStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['Status']

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['DestinationId', 'Name', 'Region', 'Location', 'Latitude', 'Longitude', 'GoogleMapsLink']
        read_only_fields = ['DestinationId'] 
