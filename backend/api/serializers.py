# backend/api/serializers.py
from rest_framework import serializers  # Correct import for serializers
from .models import User, Booking, Destination, Wishlist
from django.conf import settings
import os

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'gender', 'phone_num', 'dob', 'email', 'password']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['BookingId', 'UserEmail', 'DestinationId', 'Departure', 'TravelDate', 'BookingDate', 'Status', 'Tickets' ,'Price',]  # Include BookingId in the fields
        read_only_fields = ['BookingId', 'BookingDate']  # BookingId and BookingDate should be read-only


class BookingStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['Status']

class DestinationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Destination
        fields = [
            'DestinationId', 'Name', 'Region', 'Location', 'Latitude', 'Longitude',
            'GoogleMapsLink', 'Price', 'MaxTravellers', 'StartDate', 'EndDate',
            'Nights', 'Days', 'Image'
        ]
        read_only_fields = ['DestinationId']

    def get_ImageURL(self, obj):
        # Return full URL to the image
        if obj.ImageURL:
            print(obj.ImageURL)
            return os.path.join(settings.MEDIA_ROOT, obj.ImageURL)
            
        return None
    
class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'des', 'added_on']
        read_only_fields = ['added_on']
    
    # chat/serializers.py
"""
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'content', 'is_user', 'timestamp']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatSession
        fields = ['id', 'created_at', 'last_interaction', 'messages']

"""
