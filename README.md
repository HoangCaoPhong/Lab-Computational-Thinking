## Requirements
- Node >= 16, npm
- Get an OpenWeather API key: https://openweathermap.org/api (free tier)

## Setup
1. copy `.env.example` to `.env` and set `VITE_OPENWEATHER_KEY` and (optionally) `VITE_LIBRETRANSLATE_URL`.
2. Install:
   ```bash
   npm install
Run dev:

bash
Copy code
npm run dev
Open the printed local URL (Vite) in browser.

Notes
Geocoding uses Nominatim (no key).

POIs fetched via Overpass (no key).

LibreTranslate public instance is https://libretranslate.com/translate by default. If it is blocked, host your own or set VITE_LIBRETRANSLATE_URL to another instance or proxy.

markdown
Copy code

---

# Extra notes, troubleshooting & decisions (đọc kỹ)
1. **OpenWeather API key** is required. Put it in `.env` as `VITE_OPENWEATHER_KEY`. Vite exposes env vars prefixed with `VITE_`.
2. **LibreTranslate CORS**: public instance often allows browser requests. If you see `"Error connecting to translation server"` or CORS errors in console, two options:
   - Host a LibreTranslate instance (Docker) and use its URL.
   - Use a simple CORS proxy (not recommended for production). Alternatively run a small server to relay requests.
   - Or change to another translation API that you have access to.
3. **No server required**. This implementation is client-only.
4. **If you already have code files**: replace/merge with the files above. Delete any old `script.js` duplicates — now behavior is in React components.
5. **Leaflet CSS** is imported via `main.jsx` and `leaflet` package. If marker icons missing, code sets default icon to CDN URL.
6. **If your environment used CommonJS server (server.js)**: not necessary for our merged client-only app. If you need backend later, we can add.

---

# What to do now (exact checklist)
1. Create files and directories exactly as "Cây thư mục đề xuất" and paste code above.
2. Copy `.env.example` → `.env`, set `VITE_OPENWEATHER_KEY`.
3. In project root run:
   ```bash
   npm install
   npm run dev
Open the Vite URL printed (usually http://127.0.0.1:5173).

Test:

Enter "Ho Chi Minh" → Search → Map centers, POIs appear, weather card shows.

Click Translate (bottom-right) → popup opens → type "Hello" → Translate → Expect Vietnamese result (if LibreTranslate reachable).