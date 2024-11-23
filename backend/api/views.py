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
    


from datetime import datetime
from django.conf import settings
import os
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.core.files.storage import default_storage
from .serializers import DestinationSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from datetime import datetime
import os
from django.core.files.storage import default_storage
from django.conf import settings
from .serializers import DestinationSerializer
from .models import Destination
from rest_framework import status


class DestinationCreateView(APIView):
    parser_classes = [MultiPartParser]  # Handle file uploads

    def post(self, request):
        data = request.data
        try:
            # Parse and validate latitude/longitude
            latitude = float(data.get("Latitude", 0))
            longitude = float(data.get("Longitude", 0))
            if not (-90 <= latitude <= 90):
                return Response({"error": "Latitude must be between -90 and 90."}, status=status.HTTP_400_BAD_REQUEST)
            if not (-180 <= longitude <= 180):
                return Response({"error": "Longitude must be between -180 and 180."}, status=status.HTTP_400_BAD_REQUEST)
            google_maps_link = f"https://www.google.com/maps?q={latitude},{longitude}"

            # Parse and validate dates
            start_date = data.get("StartDate")
            end_date = data.get("EndDate")
            if start_date and end_date:
                start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
                end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
                if start_date > end_date:
                    return Response({"error": "StartDate must be earlier than EndDate."}, status=status.HTTP_400_BAD_REQUEST)
                total_days = (end_date - start_date).days + 1
                nights = total_days - 1
            else:
                total_days, nights = 0, 0

            # Save the image
            image = request.FILES.get('Image')

            # Prepare sanitized data
            sanitized_data = {
                "Name": data.get("Name"),
                "Region": data.get("Region"),
                "Location": data.get("Location"),
                "Latitude": latitude,
                "Longitude": longitude,
                "GoogleMapsLink": google_maps_link,
                "Price": float(data.get("Price", 0)),
                "MaxTravellers": int(data.get("MaxTravellers", 0)),
                "StartDate": start_date,
                "EndDate": end_date,
                "Nights": nights,
                "Days": total_days,
                "Image": image,
            }

            # Serialize and save the data
            serializer = DestinationSerializer(data=sanitized_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




class DestinationDeleteView(APIView):
    def delete(self, request, pk):
        try:
            destination = Destination.objects.get(pk=pk)
            destination.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Destination.DoesNotExist:
            return Response({"error": "Destination not found"}, status=status.HTTP_404_NOT_FOUND)
        

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Tour, Destination
from datetime import datetime

# Fetch Departure Dates Based on Destination
@api_view(['GET'])
def get_departure_dates(request):
    destination_id = request.GET.get('destination_id')
    
    if not destination_id:
        return Response({'error': 'Destination ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        destination = Destination.objects.get(id=destination_id)
        
        # Fetch tours that are related to this destination
        tours = Tour.objects.filter(destination=destination)
        
        if not tours.exists():
            return Response({'error': 'No tours found for the selected destination'}, status=status.HTTP_404_NOT_FOUND)
        
        # Prepare the departure dates for each tour
        departure_dates = []
        for tour in tours:
            if tour.departure_date:
                departure_dates.append(tour.departure_date.strftime('%Y-%m-%d'))
        
        if not departure_dates:
            return Response({'error': 'No departure dates available for the selected destination'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'departure_dates': departure_dates}, status=status.HTTP_200_OK)
    
    except Destination.DoesNotExist:
        return Response({'error': 'Destination not found'}, status=status.HTTP_404_NOT_FOUND)
    

    import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# OpenGeminiAPI endpoint URL (replace with the actual URL from the OpenGeminiAPI documentation)
OPEN_GEMINI_API_URL = "https://api.opengemini.com/query"  # Change this to the correct API endpoint

@csrf_exempt  # Disables CSRF validation for this view, typically used for API endpoints
def ask_open_gemini(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON request body
            data = json.loads(request.body)
            question = data.get("question")
            
            # Make a request to the OpenGeminiAPI
            if question:
                response = requests.post(OPEN_GEMINI_API_URL, json={"query": question})
                response_data = response.json()
                
                # Extract the answer from OpenGeminiAPI's response
                answer = response_data.get("answer", "Sorry, I couldn't find an answer to your question.")
                return JsonResponse({"answer": answer}, status=200)
            else:
                return JsonResponse({"error": "No question provided"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method. Use POST."}, status=405)

