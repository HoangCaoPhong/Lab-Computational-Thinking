// src/api.js
const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY || ''
const LIBRE_URL = import.meta.env.VITE_LIBRETRANSLATE_URL || 'https://libretranslate.com/translate'

/**
 * Geocode city -> {lat, lon, display_name}
 * using Nominatim (OpenStreetMap)
 */
export async function geocode(q) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=0`
  const res = await fetch(url, { headers: { 'User-Agent': 'OSM-Lab-Client/1.0' }})
  if (!res.ok) throw new Error('Geocode failed')
  const data = await res.json()
  if (!data || data.length === 0) throw new Error('No result')
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), name: data[0].display_name }
}

/**
 * Overpass query to get nearby POIs (amenity, tourism, shop)
 * returns array of {id, lat, lon, tags}
 */
export async function fetchPOIs(lat, lon, radius = 1000, limit = 5) {
  // Query: nodes within radius with common tags
  const q = `
  [out:json][timeout:25];
  (
    node(around:${radius},${lat},${lon})[amenity];
    node(around:${radius},${lat},${lon})[tourism];
    node(around:${radius},${lat},${lon})[shop];
  );
  out center ${limit};
  `
  const url = 'https://overpass-api.de/api/interpreter'
  const res = await fetch(url, { method: 'POST', body: q })
  if (!res.ok) throw new Error('Overpass failed')
  const data = await res.json()
  // limit then map
  const nodes = (data.elements || []).slice(0, limit).map(n => ({
    id: n.id,
    lat: n.lat || (n.center && n.center.lat),
    lon: n.lon || (n.center && n.center.lon),
    tags: n.tags || {}
  }))
  return nodes
}

/**
 * Get weather by lat/lon (OpenWeather OneCall or Current)
 */
export async function getWeather(lat, lon) {
  if (!OPENWEATHER_KEY) throw new Error('OpenWeather API key missing. Put it in VITE_OPENWEATHER_KEY')
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('OpenWeather request failed')
  const data = await res.json()
  return data
}

/**
 * Translate text using LibreTranslate (POST)
 * returns translated string or throws
 */
export async function translateText(text, source='en', target='vi') {
  if (!text || !text.trim()) return ''
  const url = LIBRE_URL
  const payload = {
    q: text,
    source,
    target,
    format: "text"
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const txt = await res.text().catch(()=>null)
    throw new Error('Translate failed: ' + (txt || res.status))
  }
  const j = await res.json()
  // public LibreTranslate returns {translatedText: "..."} or sometimes {result: "..."}
  return j.translatedText || j.result || ''
}
