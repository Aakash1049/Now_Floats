import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Detail.css"

function DetailScreen() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const {selectedLocation}=useContext(AppContext)

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&units=metric&appid=0d038ed3980cf2432f78d78a92010698`)
      .then((res) => res.json())
      .then((data) => setCurrentWeather({ ...data.main, ...data.weather[0], name: data.name, ...data.wind }));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedLocation}&units=metric&appid=0d038ed3980cf2432f78d78a92010698`)
      .then((res) => res.json())
      .then((data) => setForecast(data.list));
  }, [selectedLocation]);

  return (
    <div className="detail-screen">
      <div className="current-weather">
        <h2>{currentWeather.name}</h2>
        <img src={`https://openweathermap.org/img/w/${currentWeather.icon}.png`} alt={currentWeather.description} />
        <p>{currentWeather.description}</p>
        <p>Temperature: {currentWeather.temp}°C</p>
        <p>Feels like: {currentWeather.feels_like}°C</p>
        <p>Humidity: {currentWeather.humidity}%</p>
        <p>Wind Speed: {currentWeather.speed} km/h</p>
      </div>
      <div className="forecast">
        <h2>5-Day Forecast</h2>
        <ul>
          {forecast.map((data) => (
            <li key={data.dt}>
                {/* {console.log(data)} */}
              <p>{new Date(data.dt * 1000).toLocaleDateString()}</p>
              <p>{new Date(data.dt_txt).toLocaleTimeString()}</p>
              <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
              <p>{data.weather[0].description}</p>
              <p>Temperature: {data.main.temp}°C</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailScreen;
