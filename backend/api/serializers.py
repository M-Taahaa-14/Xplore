# backend/api/serializers.py
from rest_framework import serializers  # Correct import for serializers
from .models import User
from .models import Booking 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'gender', 'phone_num', 'dob', 'email', 'password']



class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['BookingDate']  # Automatically set on creation

class BookingStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['Status']



