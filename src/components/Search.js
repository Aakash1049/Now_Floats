import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Search.css"

function SearchScreen() {
    const [searchCity, setSearchCity] = useState("");
    const [searchState, setSearchState] = useState("");
    const [searchCountry, setSearchCountry] = useState("");
    const { setSelectedLocation, favoriteLocations, setFavoriteLocations } = useContext(AppContext)

    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate()

    function handleSearchChange(event) {
        setSearchCity(event.target.value);
    }
    function handleSearchState(event) {
        setSearchState(event.target.value);
    }
    function handleSearchCountry(event) {
        setSearchCountry(event.target.value);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        if (searchCity == "") {
            return alert("Please Enter City name")
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity},${searchCountry}&units=metric&appid=0d038ed3980cf2432f78d78a92010698`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSearchResults([{ ...data.main, ...data.weather[0], name: data.name }])
                console.log(searchResults)
            })
    }
    function handleAddToFavorites(event, location) {
        event.preventDefault();
        let newFavorites
        const prevFavorites = JSON.parse(localStorage.getItem("favoriteLocations"))
        if (!prevFavorites) {
            newFavorites = [location]

        }
        else {

            newFavorites = [...prevFavorites, location]
        }
        localStorage.setItem("favoriteLocations", JSON.stringify(newFavorites));
        if (favoriteLocations === null) {
            setFavoriteLocations([location])
        }
        else
            setFavoriteLocations([...favoriteLocations, location]);
        alert("added to favorites")
        }


    return (
        <div className="search-screen">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Enter city to search..."
                    value={searchCity}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    placeholder="Enter State to search..."
                    value={searchState}
                    onChange={handleSearchState}
                />
                <input
                    type="text"
                    placeholder="Enter Country to search..."
                    value={searchCountry}
                    onChange={handleSearchCountry}
                />
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((result) => (
                        <>
                            <li onClick={() => { setSelectedLocation(searchCity); navigate("/details") }} key={result.id}>
                                <h3>{result.name}</h3>
                                <p>{result.temp} °C</p>
                            </li>
                            <button className="favorite-button" onClick={(event) => handleAddToFavorites(event, result.name)}>Add to Favorites</button>
                        </>

                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchScreen