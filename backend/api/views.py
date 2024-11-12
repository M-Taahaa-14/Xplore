# backend/api/views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from .models import User
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# backend/api/views.py

from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import User

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        # Deserialize the incoming data using the serializer
        serializer = UserSerializer(data=request.data)
        
        # Validate and check for errors
        if serializer.is_valid():
            # Hash the password before saving the user
            hashed_password = make_password(serializer.validated_data['password'])
            serializer.validated_data['password'] = hashed_password
            
            # Save the new user to the database
            user = User.objects.create(**serializer.validated_data)
            return Response({'message': 'Signup successful', 'user': serializer.data}, status=201)
        
        # Return the errors if validation fails
        return Response({'errors': serializer.errors}, status=400)

    return JsonResponse({'error': 'Invalid request'}, status=400)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Check if email is provided
    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    try:
        # Fetch the user from the database
        user = User.objects.get(email=email)
        
        # Check if the password matches the stored hashed password
        if check_password(password, user.password):
            # Successful login
            return JsonResponse({'message': 'Login successful', 'username': user.username}, status=200)
        else:
            # Invalid password
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    except User.DoesNotExist:
        # If user does not exist
        return JsonResponse({'error': 'Invalid email or password'}, status=400)


@api_view(['GET'])
# Example for token-based user retrieval
def user_profile(request):
    email = request.GET.get('email')  # Assume email is passed as a parameter
    if not email:
        return JsonResponse({'error': 'Email not provided'}, status=400)

    try:
        user = User.objects.get(email=email)
        return JsonResponse({
            'fullName': user.name,
            'email': user.email,
            'dob': user.dob,
            'phoneNumber': user.phone_num,
            'gender': user.gender,
        }, status=200)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    

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
from django.http import JsonResponse

def get_weather(request):
    city = request.GET.get('city', None)
    if not city:
        return JsonResponse({'error': 'City parameter is required'}, status=400)

    # Log the received city name
    print(f"City received: {city}")

    # Continue with API call (ensure this part is already working)
    api_key = settings.OPENWEATHER_API_KEY
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}'
    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)
