import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//Routers
import Home from '../pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <main className="min-h-screen bg-gray-100">
      <header className="bg-teal-700 text-white p-4 text-xl font-bold text-center">
        Cinema Fanatics
      </header>
      <Home />
    </main>
    </>
  )
}

export default App
