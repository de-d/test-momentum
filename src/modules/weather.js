import { UI } from "./constants.js";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "cdbaa2db9a9310e76fa37970cfabeb93";

export async function fetchWeatherData(cityName) {
    const url = `${WEATHER_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        const weatherData = await fetchWeather(url);
        return weatherData;
    } catch (error) {
        alert("Ошибка при получении данных о погоде, скорее всего вы ввели неправильное название города");
        throw new Error("Не удалось получить данные о погоде");
    }
}

export async function fetchWeather(url) {
    const res = await fetch(url);
    const informWeather = await res.json();

    UI.WEATHER_TEMPERATURE.textContent = Math.round(informWeather.main.temp);
    UI.WEATHER_DESCRIPTION.textContent = informWeather.weather[0].description;

    return informWeather;
}

export function handleFormSubmit(event) {
    event.preventDefault();
    localStorage.setItem("lastSearchedCity", UI.WEATHER_CITY.value);
    const cityName = localStorage.getItem("lastSearchedCity");
    fetchWeatherData(cityName);
}

window.addEventListener("load", () => {
    const defaultCity = "Krasnodar";
    UI.WEATHER_CITY.value = defaultCity;
    fetchWeatherData(defaultCity);
});

