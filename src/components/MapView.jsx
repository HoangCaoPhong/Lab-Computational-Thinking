import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function MapView({ center, pois }) {
  // center: {lat, lon}
  const pos = center ? [center.lat, center.lon] : [10.762622, 106.660172] // default HCM

  return (
    <div style={{height:'78vh', borderRadius:10, overflow:'hidden'}}>
      <MapContainer center={pos} zoom={13} style={{height:'100%', width:'100%'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {center && <Marker position={pos}>
          <Popup>{center.name || 'Search location'}</Popup>
        </Marker>}
        {pois && pois.map(p => (
          <Marker key={p.id} position={[p.lat, p.lon]}>
            <Popup>
              <div style={{minWidth:150}}>
                <b>{p.tags.name || (p.tags.amenity || p.tags.tourism || p.tags.shop) || 'POI'}</b>
                <div style={{fontSize:13, marginTop:6}}>
                  {Object.entries(p.tags).slice(0,5).map(([k,v]) => <div key={k}><small>{k}: {v}</small></div>)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
