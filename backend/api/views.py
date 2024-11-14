from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from .serializers import UserSerializer
import requests
from django.conf import settings

# Signup view
@api_view(['POST'])
def signup(request):
    print(request.data)
    if request.method == 'POST':
        # Deserialize the incoming data using the serializer
        serializer = UserSerializer(data=request.data)

        # Validate and check for errors
        if serializer.is_valid():
            # Hash the password before saving the user
            password = serializer.validated_data['password']
            hashed_password = make_password(password)  # Hash the password
            
            # Create the user with the hashed password
            user = serializer.save(password=hashed_password)

            return Response({'message': 'Signup successful', 'user': serializer.data}, status=201)

        # Return the errors if validation fails
        return Response({'errors': serializer.errors}, status=402)

    return JsonResponse({'error': 'Invalid request'}, status=400)

# Login view
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    try:
        # Fetch the user from the database
        user = User.objects.get(email=email)
        print(User.email)

        # Check if the user is active
        if not user.is_active:
            return JsonResponse({'error': 'Account is deactivated'}, status=400)

        # Check if the password is correct using check_password (hashing is compared)
        if check_password(password, user.password):  # Check password hash
            return JsonResponse({'message': 'Login successful', 'username': user.username}, status=200)
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    except User.DoesNotExist:
        # If user does not exist
        return JsonResponse({'error': 'Invalid email or password'}, status=400)

# User Profile view (secured with authentication)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def get(self, request):
        # Access the currently authenticated user
        user = request.user
        return JsonResponse({
            'fullName': user.name,
            'email': user.email,
            'dob': user.dob,
            'phoneNumber': user.phone_num,
            'gender': user.gender,
        }, status=200)

# Weather Forecast view
class WeatherForecastView(APIView):
    def get(self, request):
        city = request.query_params.get("city", "").strip()
        if not city:
            return Response({"error": "City name is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        api_key = settings.OPENWEATHER_API_KEY
        if not api_key:
            return Response({"error": "API key is missing in settings"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={api_key}"
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Extract relevant weather data
            weather_data = {
                "city_name": data["city"]["name"],
                "country": data["city"]["country"],
                "forecasts": [
                    {
                        "date": forecast["dt_txt"],
                        "temperature": forecast["main"]["temp"],
                        "description": forecast["weather"][0]["description"],
                        "icon": forecast["weather"][0]["icon"],
                    }
                    for forecast in data["list"][:5]
                ]
            }
            return Response(weather_data, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Simple Weather view (non-auth)
@api_view(['GET'])
def get_weather(request):
    city = request.GET.get('city', None)
    if not city:
        return JsonResponse({'error': 'City parameter is required'}, status=400)

    # Continue with API call
    api_key = settings.OPENWEATHER_API_KEY
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}'
    response = requests.get(url)
    
    if response.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch weather data'}, status=500)
    
    data = response.json()
    return JsonResponse(data)
