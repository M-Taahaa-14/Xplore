import React from "react";
import "./WeatherForecast.css";

const WeatherCard = ({ forecast }) => {
  const time = new Date(forecast.dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="weather-card">
      <p className="card-time">{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
        className="weather-icon"
      />
      <p className="weather-description">{forecast.description}</p>
      <p className="temperature">{forecast.temperature}°C</p>
    </div>
  );
};

export default WeatherCard;