// import logo from './logo.svg';
import './Home.css';
import {useContext, useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';


function Home() {
  const [currentWeather,  setCurrentWeather]=useState({})
  const {favoriteLocations,setFavoriteLocations, setSelectedLocation}=useContext(AppContext)

  const navigate=useNavigate()
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((success)=>{
      let {latitude,longitude}=success.coords
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0d038ed3980cf2432f78d78a92010698`)
     .then(res=>res.json())
     .then(data=>{
      console.log(data)
       setCurrentWeather(data.main)
       setCurrentWeather({...data.main,...data.weather[0], name:data.name,...data.wind})
    })
    })
  },[favoriteLocations])
  
  const removeFavoriteLocation = (location) => {
    const prevFavorites=JSON.parse(localStorage.getItem("favoriteLocations"))
    const newFavorites = prevFavorites.filter(favorite => favorite !== location);
    localStorage.setItem("favoriteLocations", JSON.stringify(newFavorites));
    setFavoriteLocations(newFavorites);
  };

  return (
    <div className="home-screen">
        <Link to="/search">
        <div className="search-button">
          <button>Search By Location</button>
      </div>
        </Link>
      <div className="current-weather" onClick={()=>{setSelectedLocation(currentWeather.name); navigate("/details")}}>
        {/* Display the current weather data */}
        {currentWeather && (
          <>
            <h2>Current Weather in {currentWeather.name}</h2>
            <img src={`http://openweathermap.org/img/wn/${currentWeather.icon}.png`} alt={currentWeather.description} />
            <p>Current Location: {currentWeather.name}</p>
            <p>{currentWeather.description}</p>
            <p>Temperature: {currentWeather.temp}°C</p>
            <p>Feels like: {currentWeather.feels_like}°C</p>
            <p>Humidity: {currentWeather.humidity}%</p>
            <p>Wind Speed: {currentWeather.speed} km/h</p>
          </>
        )}
      </div>

      <div className="favorite-locations">
        <h2>Favorite Locations</h2>
        {/* Display the favorite locations list */}
        <ul>
          {favoriteLocations && favoriteLocations.map(location => (
            <div className='each-fav-location'>
            <li onClick={()=>{setSelectedLocation(location); navigate("/details")}} key={location}>{location}</li>
            <button onClick={() => removeFavoriteLocation(location)}>Remove</button>
            </div>

          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
