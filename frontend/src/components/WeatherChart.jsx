import React from "react";

const WeatherCard = ({ forecast }) => {
  // Destructure with default values and optional chaining to avoid errors
  const { 
    dt, // timestamp of forecast data
    main: { temp = 'N/A' } = {}, // Default temp to 'N/A' if `main` is undefined
    weather: [{ description = 'No description available', icon = '01d' }] = [] 
  } = forecast || {}; // Default `forecast` to an empty object if undefined

  return (
    <div className="weather-card">
      <h3>{new Date(dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h3>
      <div className="weather-icon">
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`} // Assuming this is the icon URL structure
          alt={description}
        />
      </div>
      <div className="weather-info">
        <p>{description}</p>
        <p>{temp} °C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
