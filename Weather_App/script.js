document.getElementById('city').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('output').textContent = 'Please enter a city name';
        return;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`/*Insert your API key here*/`&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        document.getElementById('output').textContent = `City: ${data.name} \nTemperature: ${data.main.temp}°C\nWeather: ${data.weather[0].description}\nHumidity: ${data.main.humidity}%`;
    } catch (error) {
        document.getElementById('output').textContent = `Error: ${error.message}`;
    } 
}