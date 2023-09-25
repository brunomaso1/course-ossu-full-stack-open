import { useEffect, useState } from "react";
import weatherService from "../services/weatherService"

/* eslint-disable react/prop-types */
export function Weather({ country }) {
    const [weather, setWeatherState] = useState(null);
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];

    useEffect(() => {
        weatherService.getWeather(lat, lon).then(weatherResponse => {
            setWeatherState(weatherResponse);
        })
    }, [])

    if (!weather) {
        return null;
    }

    return (
        <>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}