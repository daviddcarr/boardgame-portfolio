import { useState, useEffect } from 'react'

import './App.css'

import Scene from './components/Scene'


function App() {
  const [flipped, setFlipped] = useState(false)
  const [playerStep, setPlayerStep] = useState(0)
  const [fontSize, setFontSize] = useState('10rem')

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      const newFontSize = Math.max(2, Math.min(15, viewportWidth * 0.008))
      console.log("Test", viewportWidth * 0.01)
      console.log("Viewport width: ", viewportWidth)
      console.log("New font size: ", newFontSize)
      setFontSize(`${newFontSize}rem`)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen w-full bg-red-300">
      
      <Scene setFlipped={setFlipped} flipped={flipped}  playerStep={playerStep} setPlayerStep={setPlayerStep} />

      <div className="absolute inset-0 w-full flex justify-center z-0">
        <h1 className="font-heading text-red-500"
          style={{
            fontSize: fontSize,
          }}
          >DAVID DYLAN</h1>
      </div>

    </div>
  );
}

export default App;
