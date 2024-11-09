# settings.py

import os
from pathlib import Path

# Paths and directories
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'your-secret-key-here'  # Replace this with a secure key

# Debugging setting (use False in production)
DEBUG = False

# Hosts allowed to access the server
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

CORS_ALLOW_ALL_ORIGINS = True

# URL configuration module
ROOT_URLCONF = 'backend.urls'  

# Applications installed in the project
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',  # Django REST framework
    'api',  # Make sure your API app is listed here


]

# Middleware configuration
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    'corsheaders.middleware.CorsMiddleware',
]

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR,'frontend/src'),
        ],  # Specify directories for custom templates if any
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'xploredb',
        'USER': 'root',
        'PASSWORD': 'Konnect!123',  # Update with your MySQL password
        'HOST': 'localhost',  # Default to localhost; change if needed
        'PORT': '3306',       # Default MySQL port
    }
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Your React frontend's URL during development
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]  # Define the path for static files

# Media files (for user-uploaded files)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Django REST framework configuration (optional, if needed)
REST_FRAMEWORK = {
    # Define default permissions, authentication, pagination, etc.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Example: Allow all access; modify as needed
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
}

# WSGI and ASGI application definitions
WSGI_APPLICATION = 'backend.wsgi.application'

# Internationalization and localization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files directory (useful for production settings)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Logging (optional)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG' if DEBUG else 'WARNING',
    },
}

# Additional settings can be added here as needed
