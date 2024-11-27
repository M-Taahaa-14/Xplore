from django.utils.timezone import now
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Tour, Booking, Wishlist, Destination
from .serializers import UserSerializer, BookingSerializer, BookingStatusUpdateSerializer, DestinationSerializer, WishlistSerializer
import requests
from django.conf import settings
from datetime import datetime
import os
from rest_framework.parsers import MultiPartParser
from django.core.files.storage import default_storage




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
        user_email = request.data.get('UserEmail')  # Validate and use email
        destination_id = request.data.get('DestinationId')  # Destination ID for the booking
        departure = request.data.get('Departure')
        travel_date = request.data.get('TravelDate')
        booking_date = request.data.get('BookingDate')
        status = request.data.get('Status')
        tickets = request.data.get('Tickets')  # Number of tickets
        price_per_head = request.data.get('PricePerHead')  # Price per ticket (Price per head)

        print(request.data)
        
        try:
            # Fetch user by email
            user = User.objects.get(email=user_email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Ensure price_per_head and tickets are integers (or floats for price_per_head if it's not a whole number)
        try:
            price_per_head = float(price_per_head)  # Convert to float if it's a decimal value
            tickets = int(tickets)  # Convert tickets to integer
        except ValueError:
            return Response({"error": "Invalid data for price or tickets"}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate the total price (Price = Ticket count * Price per head)
        total_price = price_per_head * tickets
        print(f"Calculated Total Price: {total_price}")

        # Convert total_price back to string if needed
        total_price_str = str(total_price)

        # Prepare the data for booking creation
        booking_data = {
            'UserEmail': user_email,
            'DestinationId': destination_id,
            'Departure': departure,
            'TravelDate': travel_date,
            'BookingDate': booking_date or None,  # Allow passing of booking date or auto-generated
            'Status': status or 'Pending',  # Default to 'Pending' if no status is provided
            'Tickets': tickets,
            'Price': total_price_str  # Save the calculated total price as a string
        }
        
        

        # Serialize the data using the BookingSerializer
        serializer = BookingSerializer(data=booking_data)
        if serializer.is_valid():
            # Save the booking and return the serialized data as a response
            booking = serializer.save()
            print(f"Assigned BookingId: {booking.BookingId}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Use 201 for created status
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_bookings(request):
    email = request.GET.get('username')  # Fetch username from query params
    print(email)
    if not email:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Filter bookings by username
        bookings = Booking.objects.filter(UserEmail=email)
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
    

class DestinationDetailView(APIView):
    def get(self, request, DestinationId, format=None):
        print("HELLO")
        try:
            
            destination = Destination.objects.get(DestinationId=DestinationId)  # Fetch the destination by ID
            serializer = DestinationSerializer(destination)
            return Response(serializer.data)
        except Destination.DoesNotExist:
            return Response({"detail": "Destination not found."}, status=status.HTTP_404_NOT_FOUND)





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
    



class WishlistView(APIView):
    def get(self, request):
        user_email = request.query_params.get('user')
        print(user_email)
        user_wishlist = Wishlist.objects.filter(user=user_email) 
        serializer = WishlistSerializer(user_wishlist, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        destination_id = request.data.get('destination')
        curr_time = request.data.get('added_on')
        user_email = request.data.get('user')  # Fetch the user email from the request data


        # Check if the destination is already in the user's wishlist
        existing_item = Wishlist.objects.filter(user=user_email, des=destination_id).first()
        if existing_item:
            return Response({"message": "This item is already in your wishlist."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new wishlist item
        wishlist_item = Wishlist.objects.create(user=user_email, des=destination_id, added_on=curr_time)
        serializer = WishlistSerializer(wishlist_item)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        user_email = request.query_params.get('user')  # Fetch the user email from the query parameters

        wishlist_item = get_object_or_404(Wishlist, des=pk, user=user_email)
        wishlist_item.delete()

        return Response({"message": "Wishlist item removed successfully."}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def check_wishlist(request):
    user_email = request.query_params.get('user')
    destination_id = request.query_params.get('destination')
    print(user_email)
    print(destination_id)
    
    is_in_wishlist = Wishlist.objects.filter(user=user_email, des=destination_id).exists()
    if is_in_wishlist:
        return Response({"is_in_wishlist": is_in_wishlist}, status=status.HTTP_200_OK)
    return Response({"detail": "User or destination not found."}, status=status.HTTP_404_NOT_FOUND)

# chat/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import ChatSession, Message
from .serializers import ChatSessionSerializer, MessageSerializer
from .services import AIService



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#from .services import AIService

class GeminiAIView(APIView):
    """
    Class-based view to interact with Gemini AI for chat responses.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to get a response from Gemini AI.
        """
        user_message = request.data.get('message', '').strip()

        if not user_message:
            return Response(
                {"error": "Message content is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Initialize the AI service
            ai_service = AIService()

            # Get the AI response
            ai_response = ai_service.get_response(user_message)

            return Response(
                {"response": ai_response},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": f"Failed to get response: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ChatSessionView(APIView):
    def get(self, request):
        """Get all chat sessions"""
        sessions = ChatSession.objects.all()
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create a new chat session"""
        session = ChatSession.objects.create(user=request.user if request.user.is_authenticated else None)
        serializer = ChatSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ChatMessageView(APIView):
    def get(self, request, session_id):
        """Get all messages in a chat session"""
        session = get_object_or_404(ChatSession, id=session_id)
        messages = Message.objects.filter(session=session)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, session_id):
        """Send a message and get AI response"""
        session = get_object_or_404(ChatSession, id=session_id)
        user_message = request.data.get('message', '').strip()

        if not user_message:
            return Response(
                {'error': 'Message content is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save user message
        Message.objects.create(
            session=session,
            content=user_message,
            is_user=True
        )

        # Get AI response
        ai_service = AIService()
        ai_response = ai_service.get_response(user_message)

        # Save AI response
        ai_message = Message.objects.create(
            session=session,
            content=ai_response,
            is_user=False
        )

        # Update session's last interaction time
        session.save()  # This updates last_interaction due to auto_now=True

        return Response({
            'message': MessageSerializer(ai_message).data
        }, status=status.HTTP_201_CREATED)