import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./WeatherForecast.css";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Lahore");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(null); // Data for the chart

  // Function to fetch weather data from the Django API
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(""); // Reset errors on new search

    const url = `http://127.0.0.1:8000/api/weather/`; // Your Django API endpoint for weather
    try {
      const response = await axios.get(url, {
        params: { city }, // Send city as query parameter to Django API
      });

      console.log(response.data); // Log the response to see its structure
      setWeatherData(response.data); // Update state with response data

      // Prepare data for the 5-day forecast chart
      const forecastTemps = response.data.forecasts.map(forecast => forecast.temperature);
      const forecastMaxTemps = response.data.forecasts.map(forecast => forecast.max_temperature);
      const forecastMinTemps = response.data.forecasts.map(forecast => forecast.min_temperature);
      const forecastTimes = response.data.forecasts.map(forecast => new Date(forecast.dt * 1000).toLocaleDateString());
      
      setChartData({
        labels: forecastTimes, // Dates for X axis
        datasets: [
          {
            label: 'Temperature (°C)',
            data: forecastTemps, // Temperatures for Y axis
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true, // Fill area below line
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data on component load
  useEffect(() => {
    fetchWeatherData();
  }, []); // Only on initial load

  // Handle city input changes
  const handleCityChange = (e) => setCity(e.target.value);

  // Trigger data fetch on search button click
  const handleSearch = () => {
    if (city.trim()) fetchWeatherData(); // Fetch data if city is valid
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

      {/* Display loading, error, or data */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : weatherData ? (
        <div>
          {/* Today's First 5 Local Time Slots */}
          <div className="today-time-slots">
            <h3>Today's Forecast (First 5 Time Slots)</h3>
            <div className="forecast-list">
              {weatherData.forecasts && weatherData.forecasts.slice(0, 5).map((forecast, index) => {
                // Extract time for each forecast (each is different)
                const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Different times
                const iconUrl = `http://openweathermap.org/img/wn/${forecast.icon}.png`;
                const description = forecast.description.charAt(0).toUpperCase() + forecast.description.slice(1);

                return (
                  <div key={index} className="forecast-item">
                    <div className="forecast-time">{time}</div> {/* Display different times */}
                    <img
                      src={iconUrl}
                      alt={description}
                      className="forecast-icon"
                    />
                    <div className="forecast-description">{description}</div>
                    <div className="forecast-temp">{forecast.temperature} °C</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5-Day Weather Data with Min and Max Temps */}
          <div className="five-day-forecast">
            <h3>5-Day Weather Forecast</h3>
            <div className="forecast-list">
              {weatherData.forecasts && weatherData.forecasts.length > 0 ? (
                weatherData.forecasts.map((forecast, index) => {
                  const date = new Date(forecast.dt * 1000).toLocaleDateString();
                  const iconUrl = `http://openweathermap.org/img/wn/${forecast.icon}.png`;
                  const description = forecast.description.charAt(0).toUpperCase() + forecast.description.slice(1);

                  return (
                    <div key={index} className="forecast-item">
                      <div className="forecast-date">{date}</div>
                      <img
                        src={iconUrl}
                        alt={description}
                        className="forecast-icon"
                      />
                      <div className="forecast-description">{description}</div>
                      <div className="forecast-max-temp">Max: {forecast.max_temperature} °C</div>
                      <div className="forecast-min-temp">Min: {forecast.min_temperature} °C</div>
                    </div>
                  );
                })
              ) : (
                <p>No forecast data available for this city.</p>
              )}
            </div>
          </div>

          {/* 5-Day Temperature Chart */}
          {chartData && (
            <div className="chart-container">
              <h3>5-Day Temperature Forecast</h3>
              <Line data={chartData} options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: 'Temperature (°C)',
                    },
                  },
                },
              }} />
            </div>
          )}
        </div>
      ) : (
        <p>No data available. Please search for a valid city.</p>
      )}
    </div>
  );
};

export default WeatherForecast;
