import React, { useState } from "react";
import axios from "axios";
import "./WeatherForecast.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch weather data from the backend API
  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");

    const url = `/api/weather/?city=${encodeURIComponent(city)}`;
    try {
      const response = await axios.get(url);
      console.log("Weather data:", response.data);
      setWeatherData(response.data); // Store the forecast data in the state
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  console.log("Weather Data Structure:", weatherData);

  // Handle the search input
  const handleSearch = () => {
    if (!city.trim()) {
      setError("City name is required");
      return;
    }
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>Weather Forecast for {weatherData.city_name}, {weatherData.country}</h2>
          <div>
            {weatherData.forecasts.map((forecast, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h3>{new Date(forecast.date).toLocaleString()}</h3>
                <p>Temperature: {forecast.temperature}°C</p>
                <p>Description: {forecast.description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
                  alt={forecast.description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
