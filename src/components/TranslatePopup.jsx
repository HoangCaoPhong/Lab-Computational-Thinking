import React, { useState } from 'react'
import { translateText } from '../api'

export default function TranslatePopup({ open, onClose }) {
  const [input, setInput] = useState('')
  const [out, setOut] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function doTranslate() {
    setErr(''); setOut(''); setLoading(true)
    try {
      const res = await translateText(input || '', 'en', 'vi')
      setOut(res || '')
    } catch (e) {
      setErr(e.message || 'Error connecting to translation server.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, bottom:0,
      background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000
    }}>
      <div style={{width:380, background:'white', borderRadius:12, padding:18}}>
        <h2>English → Vietnamese</h2>
        <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter English text..." style={{width:'100%', height:120}} />
        <div style={{marginTop:8}}>
          <button onClick={doTranslate} style={{padding:'6px 10px'}}>Translate</button>
          <button onClick={()=>{ setInput(''); setOut(''); setErr('') }} style={{marginLeft:8}}>Clear</button>
        </div>

        <div style={{marginTop:12}}>
          <textarea readOnly value={loading ? 'Translating...' : (err ? ('Error: '+err) : out)} style={{width:'100%', height:120}}/>
        </div>

        <div style={{textAlign:'right', marginTop:8}}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
