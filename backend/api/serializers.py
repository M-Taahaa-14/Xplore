# backend/api/serializers.py
from rest_framework import serializers  # Correct import for serializers
from .models import User
from .models import Booking 
from .models import Destination
from django.conf import settings
import os







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





from rest_framework import serializers
from .models import Destination
from django.conf import settings
from rest_framework import serializers
from django.conf import settings
from .models import Destination

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

        

