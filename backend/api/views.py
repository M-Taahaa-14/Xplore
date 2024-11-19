from django.utils.timezone import now
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Tour, Booking, Wishlist, Destination
from .serializers import UserSerializer, BookingSerializer, BookingStatusUpdateSerializer, DestinationSerializer
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

@api_view(['PUT'])
def update_user_profile(request):
    """
    Updates user profile details based on the provided email.
    """
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        
        # Update fields only if they are provided in the request
        if 'name' in request.data:
            user.name = request.data['name']
        if 'phoneNumber' in request.data:
            user.phone_num = request.data['phoneNumber']
        
        # Save updated user details
        user.save()

        # Send updated user data in the response
        updated_user_data = {
            'Name': user.name,
            'Username': user.username,
            'Email': user.email,
            'DOB': str(user.dob),
            'Phone-Number': user.phone_num,
            'Gender': user.gender,
        }
        return Response({'user': updated_user_data}, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


def get_user_wishlist(request):
    username = request.GET.get('username')
    if username:
        wishlist_items = Wishlist.objects.filter(user__username=username)
        wishlist_data = []
        for item in wishlist_items:
            wishlist_data.append({
                'name': item.tour.name,
                'region': item.tour.region,
                'location': item.tour.location,
            })
        return JsonResponse({'wishlist': wishlist_data})
    return JsonResponse({'error': 'Username parameter is required'}, status=400)

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

@api_view(['GET'])
def get_user_bookings(request):
    username = request.GET.get('username')  # Fetch username from query params
    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Filter bookings by username
        bookings = Booking.objects.filter(User=username)
        if not bookings.exists():
            return Response({'message': 'No bookings found for this user'}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the bookings
        serializer = BookingSerializer(bookings, many=True)
        return Response({'bookings': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




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
    

class DestinationListView(APIView):
    def get(self, request):
        destinations = Destination.objects.all()
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

class DestinationCreateView(APIView):
    def post(self, request):
        # Extract data
        data = request.data

        try:
            latitude = float(data.get("Latitude", 0))
            longitude = float(data.get("Longitude", 0))

            if not (-90 <= latitude <= 90):
                return Response({"error": "Latitude must be between -90 and 90."}, status=status.HTTP_400_BAD_REQUEST)
            
            if not (-180 <= longitude <= 180):
                return Response({"error": "Longitude must be between -180 and 180."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Latitude and Longitude must be numeric values."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate Google Maps link
        google_maps_link = f"https://www.google.com/maps?q={latitude},{longitude}"
        data["GoogleMapsLink"] = google_maps_link

        print(data)
        # Save the destination
        sanitized_data = {
            "Name": data.get("Name", ""),
            "Region": data.get("Region", ""),
            "Location": data.get("Location", ""),
            "Latitude": latitude,
            "Longitude": longitude,
            "GoogleMapsLink": google_maps_link
        }
        print(sanitized_data)

        # Create the serializer with sanitized data
        serializer = DestinationSerializer(data=sanitized_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DestinationDeleteView(APIView):
    def delete(self, request, pk):
        try:
            destination = Destination.objects.get(pk=pk)
            destination.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Destination.DoesNotExist:
            return Response({"error": "Destination not found"}, status=status.HTTP_404_NOT_FOUND)