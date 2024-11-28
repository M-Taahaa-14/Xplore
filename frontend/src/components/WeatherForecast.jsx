import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import { Line } from "react-chartjs-2"; // Import the Line chart from react-chartjs-2
import "./WeatherForecast.css";

// Import chart.js components for Line chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Lahore");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(null); // State for storing chart data

  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/weather/", {
        params: { city },
      });

      setWeatherData(response.data);

      // Prepare the chart data based on the fetched weather data
      const temperatures = response.data.forecasts?.map((forecast) => forecast.max_temperature);
      const labels = response.data.forecasts?.map((forecast) =>
        new Date(forecast.dt * 1000).toLocaleDateString()
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Max Temperature (°C)",
            data: temperatures,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
            fill: false,
          },
        ],
      });
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

            {/* 5-Day Temperature Chart */}
            {chartData && (
              <div className="chart-container">
                <h3>5-Day Temperature Forecast</h3>
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: false,
                        title: {
                          display: true,
                          text: "Temperature (°C)",
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="no-data">No data available. Please search for a valid city.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
