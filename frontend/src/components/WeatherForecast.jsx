import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";
import WeatherCard from "./WeatherCard";
import "./WeatherForecast.css";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("New York");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(""); // Reset errors on new search
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // API Key from .env file
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    console.log("API URL:", url);
    

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
        console.error("Error fetching weather data", error.response?.data || error.message);
      }
       finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleCityChange = (e) => setCity(e.target.value);

  const handleSearch = () => {
    if (city.trim()) fetchWeatherData();
  };

  return (
    <div className="weather-forecast-container">
      <header className="weather-header">
        <h1>Weather Forecast</h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : weatherData ? (
        <div>
          <div className="weather-info">
            <h2>
              {weatherData.city.name}, {weatherData.city.country}
            </h2>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="weather-cards">
            {weatherData.list.slice(0, 5).map((forecast, index) => (
              <WeatherCard key={index} forecast={forecast} />
            ))}
          </div>
          <WeatherChart data={weatherData.list.slice(0, 5)} />
        </div>
      ) : (
        <p>No data available. Please search for a valid city.</p>
      )}
    </div>
  );
};

export default WeatherForecast;
