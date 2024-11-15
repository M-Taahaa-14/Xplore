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
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            password = serializer.validated_data['password']
            hashed_password = make_password(password)

            user = serializer.save(password=hashed_password)

            return Response({'message': 'Signup successful', 'user': serializer.data}, status=201)

        return Response({'errors': serializer.errors}, status=400)

    return JsonResponse({'error': 'Invalid request'}, status=405)


# Login view
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    try:
        user = User.objects.get(email=email)

        if not user.is_active:
            return JsonResponse({'error': 'Account is deactivated'}, status=400)

        if check_password(password, user.password):
            return JsonResponse({'message': 'Login successful', 'username': user.username}, status=200)

        return JsonResponse({'error': 'Invalid email or password'}, status=400)

    except User.DoesNotExist:
        return JsonResponse({'error': 'Invalid email or password'}, status=400)


# User Profile view (secured with authentication)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return JsonResponse({
            'fullName': user.name,
            'email': user.email,
            'dob': str(user.dob),
            'phoneNumber': user.phone_num,
            'gender': user.gender,
        }, status=200)


# Weather Forecast view - Updated for 5-day data with min and max temps
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

            # Format the weather data for the frontend
            weather_data = {
                "city_name": data["city"]["name"],
                "country": data["city"]["country"],
                "forecasts": [
                    {
                        "dt": forecast["dt"],  # Unix timestamp
                        "temperature": forecast["main"]["temp"],
                        "min_temperature": forecast["main"]["temp_min"],  # Minimum temperature
                        "max_temperature": forecast["main"]["temp_max"],  # Maximum temperature
                        "description": forecast["weather"][0]["description"],
                        "icon": forecast["weather"][0]["icon"],
                    }
                    for forecast in data["list"][::8]  # Take one forecast every 8 hours for 5-day forecast
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

    api_key = settings.OPENWEATHER_API_KEY
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return JsonResponse(data, status=200)

    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
