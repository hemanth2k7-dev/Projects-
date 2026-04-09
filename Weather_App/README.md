# Weather App

A simple, clean weather app that fetches real-time weather data for any city — built with vanilla HTML, CSS, and JavaScript using the OpenWeatherMap API.

---

## Features

- Search weather by city name
- **Condition-based weather emoji** — large emoji reflects the current conditions (for example ☁️ for cloudy, ☀️ / 🌙 for clear day or night, 🌧️ for rain, ⛈️ for thunderstorms, ❄️ for snow, 🌫️ for mist)
- Mapping uses OpenWeatherMap **`icon`** codes (`01d`, `04n`, etc.) when present, with **condition `id` ranges** as a fallback
- **Accessible emoji** — `role="img"` and `aria-label` set from the API weather description when results load; emoji is hidden when there is no valid result
- Displays city name, temperature (°C), weather description, and humidity
- Enter key support for fast searching
- Error handling for invalid or empty city names (emoji cleared on error)
- **Loading indicator** — spinner and “Loading weather…” text while the request runs; **Search** is disabled until the response finishes
- Clean card UI: centered weather block, gradient background, DM Sans typography

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Structure | HTML5                                   |
| Styling   | CSS3 (flexbox, gradients, `:has()` for empty state) |
| Logic     | Vanilla JavaScript (Async/Await, Fetch API) |
| Data      | OpenWeatherMap REST API                 |
| Font      | DM Sans (Google Fonts)                  |

---

## API Used

**OpenWeatherMap Current Weather API**

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

The response includes `weather[0].icon`, `weather[0].id`, and `weather[0].description`, which the app uses for the emoji and text.

Returns temperature in **Celsius** (`units=metric`).

> Requires a free API key from [openweathermap.org](https://openweathermap.org/api)

---

## Project Structure

```
Weather_App/
├── index.html   → Layout, search row, weather display (emoji, loading, text)
├── style.css    → Card UI, spinner, weather emoji, empty-state hint
└── script.js    → `API_KEY` placeholder, fetch, loading state, emoji mapping
```

---

## How to Run

No build tools or dependencies needed.

1. Clone or download the repository
2. Open `script.js` and set **`API_KEY`** to your OpenWeatherMap key (see the comment **“Put your API key here”** on the line above it). The repo does **not** ship a real key.
3. Open `index.html` in a modern browser

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
# Windows
start index.html
# macOS
open index.html
```

---

## How It Works

1. User types a city name and clicks **Search** (or presses **Enter**).
2. If **`API_KEY`** is empty, a message asks the user to add a key next to the **“Put your API key here”** comment in `script.js`.
3. Otherwise `getWeather()` clears the previous result, shows the loading UI (`#loading`, `.is-loading` on `#weather-display`), and disables **Search**.
4. The URL is built with `encodeURIComponent` for the city and key, then **`fetch()`** runs against OpenWeatherMap.
5. In **`finally`**, loading is hidden and the button is re-enabled.
6. On success, `getWeatherEmoji()` picks an emoji from `weather[0].icon` or `weather[0].id`; details go to `#output`.
7. On failure (invalid city, network error, etc.), the emoji is cleared and `#output` shows the error.

### UI layout

- **`.weather-display`** — flex column, centers the emoji and details.
- **`.weather-emoji`** — large emoji with a light drop shadow; hidden when empty (`:empty`).
- **`.weather-text`** — `<pre>` for line breaks in the details; centered text.
- **`#loading`** — spinner + label; toggled with the `hidden` attribute. While **`.is-loading`** is set, the empty-state **`::before`** hint is suppressed so it does not overlap the spinner.
- When there is no result yet, a CSS **`::before`** hint (“Enter a city and click Search”) appears on `.weather-display` when the text area is empty (uses **`:has(.weather-text:empty)`**).

---

## Browser support

The empty-state styling uses **`:has()`**. Use a recent browser (for example Chrome 105+, Safari 15.4+, Firefox 121+). Older browsers may not show the placeholder hint; the app still works once you search.

---

## Security Note

The API key in client-side code is **visible to anyone** who opens the page or views the source. Do not commit a real key to a public repository.

**To get a free API key:**

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Open your dashboard → API Keys
3. Paste the key into the **`API_KEY`** constant in `script.js` (directly under the **“Put your API key here”** comment)

**For production or public repos:**

- Store the API key on a backend and proxy requests to OpenWeatherMap
- Or use environment variables on a host that injects secrets at build time

---

## Known Limitations

- API key is exposed in client-side code once you set `API_KEY`
- Only current weather — no forecast
- Temperature unit is fixed to Celsius
- Emoji appearance depends on the OS / browser font (color emoji support)

---

## Possible Improvements

- [ ] 5-day forecast using the `/forecast` endpoint
- [ ] Toggle for Celsius / Fahrenheit
- [ ] Optional OpenWeatherMap image icons alongside or instead of emoji
- [ ] Backend or env-based API key for public deployment

---

## Author

Built by **Hemanth Kumar** as a JavaScript practice project.  
Focused on: Fetch API, Async/Await, API keys, loading UX, DOM manipulation, error handling, and condition-based UI (emoji + layout).
