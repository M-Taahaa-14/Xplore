# backend/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from datetime import datetime


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True.')
        if not extra_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=150, unique=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    phone_num = models.CharField(max_length=15, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    def __str__(self):
        return self.email

from django.db import models

from datetime import timedelta

class Destination(models.Model):
    DestinationId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Region = models.CharField(max_length=100)
    Location = models.CharField(max_length=100)
    Latitude = models.FloatField(null=True, blank=True)
    Longitude = models.FloatField(null=True, blank=True)
    GoogleMapsLink = models.URLField(max_length=100, null=True, blank=True)
    Price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    MaxTravellers = models.IntegerField(null=True, blank=True)
    StartDate = models.DateField(null=True, blank=True)
    EndDate = models.DateField(null=True, blank=True)
    Nights = models.IntegerField(default=0)
    Days = models.IntegerField(default=0)
    Image = models.ImageField(upload_to='', null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.StartDate and self.EndDate:
            duration = (self.EndDate - self.StartDate).days
            self.Days = duration
            self.Nights = max(0, duration - 1)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.Name



class Booking(models.Model):
    BookingId = models.AutoField(primary_key=True)
    UserEmail = models.EmailField(max_length=100 ,default='fahad@gamil.com')  # Store the user email
    DestinationId = models.CharField(max_length=100)  # Store the DestinationId (e.g., tour ID)
    Departure = models.CharField(max_length=100)    # Departure location (string)
    BookingDate = models.DateField(auto_now_add=True)  # Automatically set when booking is created
    TravelDate = models.DateField()                  # Travel date (DateField)
    Status = models.CharField(max_length=20, default='Pending')  # Status of the booking (e.g., 'Pending', 'Confirmed')
    Tickets = models.IntegerField() 
    Price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Booking {self.BookingId} for {self.UserEmail} to {self.DestinationId}"


# Define the function that returns the current date and time
def get_default_added_on():
    return datetime.now()

# Your Wishlist model
class Wishlist(models.Model):
    user = models.EmailField(max_length=191, default="user@gmail.com")
    des = models.IntegerField(default=0)
    added_on = models.DateTimeField(default=get_default_added_on)  # Reference the function

    def __str__(self):
        return self.user

"""
    
# chat/models.py
class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_interaction = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Chat Session {self.id} - {self.created_at}"

class Message(models.Model):
    session = models.ForeignKey('ChatSession', on_delete=models.CASCADE)
    content = models.TextField()
    is_user = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{'User' if self.is_user else 'AI'} message in session {self.session_id}"  

        
"""