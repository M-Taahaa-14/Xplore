# backend/api/views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password

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
