// Put your API key here
const API_KEY = '';

const emojiEl = document.getElementById('weather-emoji');
const outputEl = document.getElementById('output');
const loadingEl = document.getElementById('loading');
const weatherDisplayEl = document.getElementById('weather-display');
const searchBtn = document.getElementById('search-btn');

function setLoading(isLoading) {
    weatherDisplayEl.classList.toggle('is-loading', isLoading);
    loadingEl.hidden = !isLoading;
    loadingEl.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    searchBtn.disabled = isLoading;
}

document.getElementById('city').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

function getWeatherEmoji(w) {
    const iconMap = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '⛅',
        '02n': '☁️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌧️',
        '10n': '🌧️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️',
    };
    const icon = w.icon || '';
    if (iconMap[icon]) return iconMap[icon];

    const id = w.id;
    if (id >= 200 && id <= 232) return '⛈️';
    if (id >= 300 && id <= 321) return '🌧️';
    if (id >= 500 && id <= 531) return '🌧️';
    if (id >= 600 && id <= 622) return '❄️';
    if (id >= 701 && id <= 781) return '🌫️';
    if (id === 800) return '☀️';
    if (id === 801) return '⛅';
    if (id >= 802 && id <= 804) return '☁️';
    return '🌤️';
}

function clearWeatherEmoji() {
    emojiEl.textContent = '';
    emojiEl.setAttribute('aria-label', '');
}

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        clearWeatherEmoji();
        outputEl.textContent = 'Please enter a city name';
        return;
    }
    if (!API_KEY) {
        clearWeatherEmoji();
        outputEl.textContent = 'Put your API key in script.js (see comment: Put your API key here).';
        return;
    }
    clearWeatherEmoji();
    outputEl.textContent = '';
    setLoading(true);
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        const w = data.weather[0];
        const emoji = getWeatherEmoji(w);
        emojiEl.textContent = emoji;
        emojiEl.setAttribute('aria-label', `Weather: ${w.description}`);
        outputEl.textContent = `City: ${data.name} \nTemperature: ${data.main.temp}°C\nWeather: ${w.description}\nHumidity: ${data.main.humidity}%`;
    } catch (error) {
        clearWeatherEmoji();
        outputEl.textContent = `Error: ${error.message}`;
    } finally {
        setLoading(false);
    }
}