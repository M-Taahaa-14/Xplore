from django.utils.timezone import now
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Tour, Booking
from .serializers import UserSerializer, BookingSerializer, BookingStatusUpdateSerializer
import requests
from django.conf import settings


# User Signup
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        password = serializer.validated_data['password']
        hashed_password = make_password(password)
        serializer.save(password=hashed_password)
        return Response({'message': 'Signup successful', 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# User Login
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        if not user.is_active:
            return Response({'error': 'Account is deactivated'}, status=status.HTTP_403_FORBIDDEN)

        if check_password(password, user.password):
            return Response({'message': 'Login successful', 'username': user.username}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)


# Fetch User Profile by Email
@api_view(['GET'])
def get_user_by_email(request):
    email = request.GET.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        user_data = {
            'Name': user.name,
            'Username': user.username,
            'Email': user.email,
            'DOB': str(user.dob),
            'PhoneNumber': user.phone_num,
            'Gender': user.gender,
        }
        return Response({'user': user_data}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



# Weather Forecast
class WeatherForecastView(APIView):
    def get(self, request):
        city = request.query_params.get("city", "").strip()
        if not city:
            return Response({"error": "City name is required"}, status=status.HTTP_400_BAD_REQUEST)

        api_key = settings.OPENWEATHER_API_KEY
        url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={api_key}"

        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            weather_data = {
                "city_name": data["city"]["name"],
                "country": data["city"]["country"],
                "forecasts": [
                    {
                        "dt": forecast["dt"],
                        "temperature": forecast["main"]["temp"],
                        "min_temperature": forecast["main"]["temp_min"],
                        "max_temperature": forecast["main"]["temp_max"],
                        "description": forecast["weather"][0]["description"],
                        "icon": forecast["weather"][0]["icon"],
                    }
                    for forecast in data["list"][::8]
                ]
            }
            return Response(weather_data, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Add a Booking

class AddBookingView(APIView):
    def post(self, request):
        # Extract data from the request
        user_username = request.data.get('User')  # User refers to the username
        tour_name = request.data.get('Tour')     # Tour refers to the user's name
        departure = request.data.get('Departure')
        travel_date = request.data.get('TravelDate')
        booking_date = request.data.get('BookingDate')
        status = request.data.get('Status')
        print(user_username)
        try:
            # Fetch user by username
            user = User.objects.get(username=user_username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Prepare the data for booking creation
        booking_data = {
            'User': user_username,           # Store the user object (not just the username)
            'Tour': tour_name,      # Store the tour name as a string
            'Departure': departure,
            'TravelDate': travel_date,
            'BookingDate': booking_date,  # BookingDate can be passed, or auto-generated
            'Status': status,
        }
        
        # Serialize the data using the BookingSerializer
        serializer = BookingSerializer(data=booking_data)     
        if serializer.is_valid():
            # Save the booking and return the serialized data as a response
            booking = serializer.save()
            print(f"Assigned BookingId: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Use 201 for created status
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# View Booking
class BookingListView(APIView):
    # GET request to fetch all bookings
    def get(self, request):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




# Update Booking Status
class UpdateBookingStatusView(APIView):
    def patch(self, request, booking_id):
        print(request)
        try:
            booking = Booking.objects.get(pk=booking_id)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        if booking.Status != "Pending":
            return Response({"error": "Only pending bookings can be updated."}, status=status.HTTP_400_BAD_REQUEST)

        new_status = request.data.get("Status")
        print(new_status)
        if new_status not in ["Confirmed", "Canceled"]:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        booking.Status = new_status
        booking.save()
        return Response({"id": booking.BookingId, "Status": booking.Status}, status=status.HTTP_200_OK)