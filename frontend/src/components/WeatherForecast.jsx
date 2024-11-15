import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./WeatherForecast.css";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Lahore");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/weather/", {
        params: { city },
      });

      setWeatherData(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSearch = () => {
    if (city.trim()) fetchWeatherData();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Weather Forecast</h1>
        <div className="search-bar">
          <input
            className="search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
          />
          <button 
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      <div className="content">
        {error ? (
          <div className="error-message">{error}</div>
        ) : weatherData ? (
          <div className="forecast-sections">
            {/* Today's Forecast */}
            <div className="section">
              <h3 className="section-title">Today's Forecast</h3>
              <div className="forecast-grid">
                {weatherData.forecasts?.slice(0, 5).map((forecast, index) => (
                  <WeatherCard key={index} forecast={forecast} />
                ))}
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="section">
              <h3 className="section-title">5-Day Forecast</h3>
              <div className="forecast-grid">
                {weatherData.forecasts?.map((forecast, index) => (
                  <div key={index} className="forecast-card">
                    <p className="forecast-date">
                      {new Date(forecast.dt * 1000).toLocaleDateString()}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                      alt={forecast.description}
                      className="forecast-icon"
                    />
                    <p className="forecast-description">{forecast.description}</p>
                    <div className="forecast-temps">
                      <p className="max-temp">Max: {forecast.max_temperature}°C</p>
                      <p className="min-temp">Min: {forecast.min_temperature}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="no-data">No data available. Please search for a valid city.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;