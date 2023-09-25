import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = (lat, lon) => {
    const appid = import.meta.env.VITE_WEATHER_KEY;
    const units = 'metric'
    return axios.get(baseUrl, { params: { lat, lon, appid, units } })
        .then(response => response.data)
}

const weatherService = { getWeather }
export default weatherService;