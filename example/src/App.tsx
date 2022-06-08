import React, { useState, useEffect } from 'react'
import { useLocalStorage } from 'react-custome-hooks'
import './App.css'

function App() {
  const [name, setName] = useLocalStorage('name', 'Puskar')
  console.log(name)

  return (
    <div className='App'>
      Hello World
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

export default App
