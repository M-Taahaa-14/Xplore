DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'xploredb',
        'USER': 'root',
        'PASSWORD': 'Konnect!123',
        'HOST': 'localhost',  # Use the appropriate host if different
        'PORT': '3306',       # Default MySQL port
    }
}

INSTALLED_APPS = [
    # other apps
    'rest_framework',
]
