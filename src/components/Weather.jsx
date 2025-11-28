import React from 'react'

export default function Weather({ data }) {
  if (!data) return <div className="weatherInfo panel">No weather data</div>
  const t = data.main?.temp
  const description = data.weather && data.weather[0] && data.weather[0].description
  return (
    <div className="weatherInfo panel" style={{padding:14}}>
      <h3 style={{margin:'0 0 8px 0'}}>{data.name || 'Location'}</h3>
      <div>Temperature: {t !== undefined ? t.toFixed(2) + ' °C' : 'N/A'}</div>
      <div style={{marginTop:8}}>Weather: {description || 'N/A'}</div>
    </div>
  )
}
