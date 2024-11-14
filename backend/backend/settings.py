import os
from pathlib import Path
from decouple import config

# Paths and directories
BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings
SECRET_KEY = 'your-secret-key-here'  # Replace this with a secure key
DEBUG = False
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
CORS_ALLOW_ALL_ORIGINS = True  # For testing purposes, but consider disabling in production.
CORS_ALLOW_CREDENTIALS = True  # If you want to send cookies in the requests

AUTH_USER_MODEL = 'api.User'


# CORS settings
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # React frontend during development
    'http://127.0.0.1:8000',  # Backend URL
]

# URL configuration
ROOT_URLCONF = 'backend.urls'

AUTH_USER_MODEL = 'api.User'

OPENWEATHER_API_KEY = config('OPENWEATHER_API_KEY', default=None)
print("Loaded API Key:", OPENWEATHER_API_KEY)


# Installed applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'api',  # Your API app
]

# Middleware configuration
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# Template configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend/src')],
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
        'PASSWORD': '786_Jhang',  # Update with your MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# Static and media files
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


# Django REST framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Modify as needed
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
}

# WSGI application
WSGI_APPLICATION = 'backend.wsgi.application'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Logging configuration (optional)
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
