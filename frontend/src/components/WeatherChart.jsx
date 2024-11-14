import React from "react";
import { Line } from "react-chartjs-2";
import "./WeatherChart.css";

const WeatherChart = ({ data }) => {
  if (!data || data.length === 0) return null; // Ensure data is valid

  const chartData = {
    labels: data.map((forecast) =>
      new Date(forecast.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((forecast) => forecast.main.temp),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="weather-chart">
      <h3>Temperature Trends</h3>
      <Line data={chartData} />
    </div>
  );
};

export default WeatherChart;
