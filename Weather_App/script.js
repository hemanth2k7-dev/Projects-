// Put your API key here
const API_KEY = '';

const emojiEl = document.getElementById('weather-emoji');
const outputEl = document.getElementById('output');
const mainOutputEl = document.getElementById('main-output');
const detailsOutputEl = document.getElementById('details-output');
const weatherContentEl = document.getElementById('weather-content');
const loadingEl = document.getElementById('loading');
const weatherDisplayEl = document.getElementById('weather-display');
const searchBtn = document.getElementById('search-btn');

const HIGH_RAIN_CHANCE_THRESHOLD = 60;

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

function resetWeatherView() {
    mainOutputEl.textContent = '';
    detailsOutputEl.innerHTML = '';
    weatherContentEl.hidden = true;
}

function getRainSeverity(rainChance) {
    if (rainChance === null) return { label: 'N/A', className: 'badge-na' };
    if (rainChance < 30) return { label: 'Low', className: 'badge-low' };
    if (rainChance < 60) return { label: 'Moderate', className: 'badge-moderate' };
    if (rainChance < 80) return { label: 'High', className: 'badge-high' };
    return { label: 'Very High', className: 'badge-very-high' };
}

async function fetchRainChance(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
        throw new Error('Rain chance data unavailable');
    }
    const forecastData = await forecastResponse.json();
    const next24Hours = Array.isArray(forecastData?.list)
        ? forecastData.list.slice(0, 8)
        : [];
    const popValues = next24Hours
        .map((slot) => slot?.pop)
        .filter((value) => typeof value === 'number');

    if (!popValues.length) {
        return null;
    }

    const maxChance = Math.max(...popValues);
    return Math.round(maxChance * 100);
}

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        clearWeatherEmoji();
        resetWeatherView();
        outputEl.hidden = false;
        outputEl.textContent = 'Please enter a city name';
        return;
    }
    if (!API_KEY) {
        clearWeatherEmoji();
        resetWeatherView();
        outputEl.hidden = false;
        outputEl.textContent = 'Put your API key in script.js (see comment: Put your API key here).';
        return;
    }
    clearWeatherEmoji();
    resetWeatherView();
    outputEl.hidden = true;
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
        const [rainChanceResult] = await Promise.allSettled([
            fetchRainChance(data.name),
        ]);
        const rainChance = rainChanceResult.status === 'fulfilled' && typeof rainChanceResult.value === 'number'
            ? rainChanceResult.value
            : null;
        const rainSeverity = getRainSeverity(rainChance);
        const rainWarningHtml = rainChance !== null && rainChance >= HIGH_RAIN_CHANCE_THRESHOLD
            ? `<div class="inline-rain-warning">Rain warning: chance is ${rainChance}%</div>`
            : '';

        emojiEl.textContent = emoji;
        emojiEl.setAttribute('aria-label', `Weather: ${w.description}`);
        mainOutputEl.textContent = `City: ${data.name}\nTemperature: ${data.main.temp}°C\nWeather: ${w.description}`;
        detailsOutputEl.innerHTML = `
            <div class="detail-row">Humidity: <strong>${data.main.humidity}%</strong></div>
            <div class="detail-row">Pressure: <strong>${data.main.pressure} hPa</strong></div>
            <div class="detail-row">Chance of Rain: <strong>${rainChance === null ? 'N/A' : `${rainChance}%`}</strong> <span class="metric-badge ${rainSeverity.className}">${rainSeverity.label}</span></div>${rainWarningHtml}
        `;
        weatherContentEl.hidden = false;
    } catch (error) {
        clearWeatherEmoji();
        resetWeatherView();
        outputEl.hidden = false;
        outputEl.textContent = `Error: ${error.message}`;
    } finally {
        setLoading(false);
    }
}