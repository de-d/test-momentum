import { UI } from './constants.js'

export function showTime() {
    const date = new Date();
    const options = {
        day: 'numeric',
        month: 'long'
    };
    const formattedDate = date.toLocaleString('ru-RU', options);
    const weekday = date.toLocaleString('ru-RU', { weekday: 'long' });
    UI.TIME.textContent = date.toLocaleTimeString()
    UI.DATE.textContent = `${formattedDate}, ${weekday}`;
    setTimeout(showTime, 1000);

    const hour = date.getHours();
    if (hour >= 0 && hour < 6) {
        document.body.style.backgroundImage = 'url("/test-momentum/images/01.jpg")';
    } else if (hour >= 6 && hour < 10) {
        document.body.style.backgroundImage = 'url("/test-momentum/images/02.jpg")';
    } else if (hour >= 10 && hour < 18) {
        document.body.style.backgroundImage = 'url("/test-momentum/images/03.jpg")';
    } else {
        document.body.style.backgroundImage = 'url("/test-momentum/images/04.jpg")';
    }
}