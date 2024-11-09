# backend/api/serializers.py
from rest_framework import serializers  # Correct import for serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'gender', 'phone_num', 'dob', 'email', 'password']
