# backend/api/views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password

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
