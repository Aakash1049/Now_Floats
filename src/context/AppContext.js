import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({
    selectedLocation:"",
    setSelectedLocation:()=>{},
    favoriteLocations:[],
    setFavoriteLocations:()=>{}
});

export const AppProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [favoriteLocations, setFavoriteLocations] = useState(
    JSON.parse(localStorage.getItem("favoriteLocations"))
    );


  return (
    <AppContext.Provider
      value={{ selectedLocation, setSelectedLocation, favoriteLocations, setFavoriteLocations }}
    >
      {children}
    </AppContext.Provider>
  );
};
