import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000).toLocaleDateString();
  const { temp } = forecast.main;
  const { icon, description } = forecast.weather[0];

  return (
    <div className="weather-card">
      <p>{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p>{description}</p>
      <p>Temp: {temp}°C</p>
    </div>
  );
};

export default WeatherCard;
