import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('Ho Chi Minh')

  function submit(e) {
    e?.preventDefault()
    if (!q || q.trim()==='') return
    onSearch(q.trim())
  }

  return (
    <form onSubmit={submit}>
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Enter city name..."
        style={{padding:'10px', width: '260px', borderRadius:6, border:'1px solid #bbb'}}
      />
      <button style={{marginLeft:8, padding:'10px 14px', borderRadius:6, background:'#1976d2', color:'white', border:'none', cursor:'pointer'}}>Search</button>
    </form>
  )
}
