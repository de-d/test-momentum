import { UI } from "./modules/constants.js";
import { handleFormSubmit } from "./modules/weather.js";
import { showTime } from './modules/time-and-date.js'
import { loadFormData } from "./modules/todo.js";
import '../style.css';

UI.WEATHER_CITY.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleFormSubmit(event);
  }
});

showTime();
loadFormData();