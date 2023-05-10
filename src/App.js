import { useState, useEffect } from 'react'

import './App.css'

import Scene from './components/Scene'


function App() {
  const [flipped, setFlipped] = useState(false)
  const [playerStep, setPlayerStep] = useState(0)

  useEffect(() => {
    console.log('playerStep', playerStep)
  }, [playerStep])

  return (
    <div className="h-screen w-full">
      
      <Scene setFlipped={setFlipped} flipped={flipped}  playerStep={playerStep} setPlayerStep={setPlayerStep} />

      {/* <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPlayerStep(playerStep + 1)}
          >
          Next Step
        </button>
      </div> */}

    </div>
  );
}

export default App;
