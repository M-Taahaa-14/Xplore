import requests

api_key = '4b70de9efa5b4c136ceb026ec70da9ca'
city = 'New York'
url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
response = requests.get(url)
print(response.json())
