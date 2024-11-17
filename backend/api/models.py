# backend/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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

class Destination(models.Model):
    DestinationId = models.IntegerField(primary_key=True)
    Name = models.CharField(max_length=100)
    Region = models.CharField(max_length=100)
    Location = models.CharField(max_length=100)

class Tour(models.Model):
    TourId = models.IntegerField(primary_key=True)
    TourName = models.CharField(max_length=100)
    Destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    MaxTravellers = models.IntegerField()
    StartDate = models.DateField()
    EndDate = models.DateField()
    Nights = models.IntegerField()
    Days = models.IntegerField()

class Booking(models.Model):
    BookingId = models.AutoField(primary_key=True)  
    User = models.CharField(max_length=100)         
    Tour = models.CharField(max_length=100)         # Store the tour name as a string
    Departure = models.CharField(max_length=100)    # Departure location (string)
    BookingDate = models.DateField(auto_now_add=True)  # Automatically set when booking is created
    TravelDate = models.DateField()                  # Travel date (DateField)
    Status = models.CharField(max_length=20, default='Pending')  # Status of the booking (e.g., 'Pending', 'Confirmed')

    def __str__(self):
        return f"Booking {self.BookingId} for {self.User} to {self.Tour}"

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='wishlists')
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s wishlist - {self.tour.name}"

    class Meta:
        unique_together = ('user', 'tour')  # Ensure each user can only add a tour once to their wishlist