# Weather App

A simple, clean weather app that fetches real-time weather data for any city — built with vanilla HTML, CSS, and JavaScript using the OpenWeatherMap API.

---

## Features

- Search weather by city name
- Displays temperature, weather condition, and humidity
- Enter key support for fast searching
- Error handling for invalid or empty city names
- Clean, minimal UI with smooth button interactions

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Structure | HTML5                                   |
| Styling   | CSS3 (custom properties, flexbox, gradients) |
| Logic     | Vanilla JavaScript (Async/Await, Fetch API) |
| Data      | OpenWeatherMap REST API                 |
| Font      | DM Sans (Google Fonts)                  |

---

## API Used

**OpenWeatherMap Current Weather API**

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

Returns temperature in **Celsius** (`units=metric`).

> Requires a free API key from [openweathermap.org](https://openweathermap.org/api)

---

## Project Structure

```
weather-app/
├── index.html   → App layout and structure
├── style.css    → Light card UI with purple gradient background
└── script.js    → API call, DOM update, error handling
```

---

## How to Run

No build tools or dependencies needed.

1. Clone or download the repository
2. Add your OpenWeatherMap API key in `script.js`
3. Open `index.html` in any browser

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
open index.html
```

> **Note:** The API key is commented out in `script.js`. Add your own key before running.

---

## How It Works

1. User types a city name and clicks **Search** (or presses **Enter**)
2. `getWeather()` builds the API URL with the city name and API key
3. A `fetch()` call is made to the OpenWeatherMap endpoint
4. On success, temperature, weather description, and humidity are rendered to the DOM
5. On failure (invalid city, empty input), an error message is shown

---

## ⚠️ Security Note

The API key is **commented out in `script.js`**. Add your own key to run the app. Never commit a real API key to a public repo — it will be exposed and can be stolen.

**To get a free API key:**
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Go to your dashboard → API Keys
3. Paste it into the marked spot in `script.js`

**For production or public repos:**
- Store the API key in a backend server and proxy the request
- Or use environment variables if deploying via a platform like Netlify/Vercel

---

## Known Limitations

- API key is exposed in client-side code
- No loading indicator while fetching
- Only shows current weather — no forecast
- Temperature unit is hardcoded to Celsius

---

## Possible Improvements

- [ ] Add a loading spinner during fetch
- [ ] Show a 5-day forecast using the `/forecast` endpoint
- [ ] Add toggle for Celsius / Fahrenheit
- [ ] Display weather icons from OpenWeatherMap
- [ ] Move API key to a backend or environment variable

---

## Author

Built by **Hemanth Kumar** as a JavaScript practice project.  
Focused on: Fetch API, Async/Await, API keys, DOM manipulation, error handling.