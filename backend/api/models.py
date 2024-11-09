# backend/api/models.py

from django.db import models

class User(models.Model):
    # Define the fields for your User model

    name = models.CharField(max_length=255)
    username = models.CharField(max_length=150, unique=True)
    gender = models.CharField(max_length=10)
    phone_num = models.CharField(max_length=15)
    dob = models.DateField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Store hashed password in a real app

    def __str__(self):
        return self.username
