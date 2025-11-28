import React, { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MapView from './components/MapView'
import Weather from './components/Weather'
import TranslatePopup from './components/TranslatePopup'
import { geocode, fetchPOIs, getWeather } from './api'

export default function App() {
  const [center, setCenter] = useState(null)
  const [pois, setPois] = useState([])
  const [weather, setWeather] = useState(null)
  const [translateOpen, setTranslateOpen] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSearch(q) {
    setStatus('Searching...')
    setWeather(null)
    setPois([])
    try {
      const g = await geocode(q)
      setCenter(g)
      setStatus('Fetching POIs...')
      const p = await fetchPOIs(g.lat, g.lon, 1200, 5)
      setPois(p)
      setStatus('Fetching weather...')
      const w = await getWeather(g.lat, g.lon)
      setWeather(w)
      setStatus('Done')
    } catch (e) {
      console.error(e)
      setStatus(e.message || 'Error')
      setCenter(null)
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Weather App + Quick Translate</h1>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        <div className="panel">
          <SearchBar onSearch={handleSearch} />
          <div style={{marginTop:12, color:'#666'}}>{status}</div>
          {weather && <Weather data={weather} />}
        </div>

        <div className="panel">
          <h3>Points of Interest (POI)</h3>
          {pois.length === 0 ? <div style={{color:'#777'}}>No POIs yet — search a city.</div> : (
            <ul>
              {pois.map(p => <li key={p.id}><b>{p.tags.name || p.tags.amenity || p.tags.tourism || p.tags.shop || '(unnamed)'}</b> — {p.tags.operator || p.tags.brand || ''}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="panel" style={{ gridColumn:'2 / 3' }}>
        <MapView center={center} pois={pois} />
      </div>

      <button className="float-translate" onClick={()=>setTranslateOpen(true)}>Translate</button>

      <TranslatePopup open={translateOpen} onClose={()=>setTranslateOpen(false)} />
    </div>
  )
}
