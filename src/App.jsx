import { useState } from 'react'
import reactLog from '/vite.svg'
import './App.css'
import Pokedex from './assets/components/Pokedex/Pokedex'
import Search from './assets/components/Search/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Pokedex/>
    </div>
  )
}

export default App
