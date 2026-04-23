# Weather App

A clean weather app that shows current weather for any city, with a simple split-card layout and rain insights.

---

## What It Shows

- City name, temperature, and weather condition with emoji
- Humidity and pressure
- Chance of rain (next 24 hours)
- Rain severity badge (Low, Moderate, High, Very High)
- Inline rain warning message when rain chance is high

---

## UI Updates

- Two-card weather display:
  - Left card: emoji + main weather info
  - Right card: humidity, pressure, and rain chance details
- Cleaner error handling and loading behavior
- Better empty state: no overlap between placeholder and error messages

---

## How Rain Chance Works

Rain chance is calculated from forecast data and shows the **highest probability in the next 24 hours**, so it is more realistic than checking only one forecast slot.

---

## How to Run

1. Add your OpenWeather API key in `script.js`
2. Open `index.html` in your browser
3. Search by city name

> Get a free API key from [openweathermap.org](https://openweathermap.org/api)

---

## Notes

- Temperature is shown in Celsius
- API key should not be committed in public repositories

---

## Author

Built by **Hemanth Kumar**.
