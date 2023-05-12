import { useState, useEffect, Suspense } from 'react'
import Loading from './components/Loading'

import { GiClick, GiPerspectiveDiceSixFacesOne, GiCardPick } from 'react-icons/gi'
import { MdPinch } from 'react-icons/md'
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import { TbInfoHexagon } from 'react-icons/tb'

import { BsLinkedin, BsGithub, BsImages, BsFillFileEarmarkPdfFill } from 'react-icons/bs'

import './App.css'

import Scene from './components/Scene'


function App() {
  const [flipped, setFlipped] = useState(false)
  const [playerStep, setPlayerStep] = useState(0)
  const [fontSize, setFontSize] = useState('10rem')

  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      const newFontSize = Math.max(2, Math.min(15, viewportWidth * 0.008))
      setFontSize(`${newFontSize}rem`)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main className="h-screen w-full">
      <Suspense fallback={<Loading />}>

      <Scene setFlipped={setFlipped} flipped={flipped}  playerStep={playerStep} setPlayerStep={setPlayerStep} />

      <div className={`absolute inset-0 w-full flex  flex-col items-center ${ showInfo ? 'z-20 backdrop-blur bg-opacity-30 bg-gray-500' : 'z-0' }`}
        onClick={() => setShowInfo(false)}
        >
        <div className="text-center">
          <h1 className="font-heading text-red-500 leading-none "
            style={{
              fontSize: fontSize,
            }}
            >DAVID DYLAN</h1>
          <h2
            className="font-sans text-white leading-none  uppercase"
            >Developer / Artist</h2>
        </div>

        {
          showInfo && (
          <div className="mt-[10vh] space-y-6">
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-white"><MdPinch className="inline text-xl md:text-2xl" /> Pinch / Scroll to Zoom</p>
              <p className="text-lg md:text-xl text-white"><HiOutlineArrowsExpand className="inline text-xl md:text-2xl" /> Drag to Move</p>
              <p className="text-lg md:text-xl text-white"><GiPerspectiveDiceSixFacesOne className="inline text-xl md:text-2xl" /> Tap die to Roll</p>
              <p className="text-lg md:text-xl text-white"><GiCardPick className="inline text-xl md:text-2xl" /> Tap card to Flip</p>
              <p className="text-lg md:text-xl text-white"><GiClick className="inline text-xl md:text-2xl" /> Tap Anywhere to Start</p>
            </div>

            <div className="flex flex-col space-y-2">
              <a 
                href="https://www.daviddylancarr.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white text-lg md:text-xl flex items-center space-x-2"
                aria-label="Link to David Dylan's 2D Portfolio site"
                >
                  <BsImages className="inline text-xl md:text-2xl" /> <span>2D Portfolio</span>
              </a>
              <a
                href="https://www.linkedin.com/in/david--dylan/"
                target="_blank"
                rel="noreferrer"
                className="text-white text-lg md:text-xl flex items-center space-x-2"
                aria-label="Link to David Dylan's LinkedIn Profile"
                >
                 <BsLinkedin className="inline text-xl md:text-2xl" /> <span>LinkedIn</span>
              </a>
              <a
                href="https://www.github.com/daviddcarr"
                target="_blank"
                rel="noreferrer"
                className="text-white text-lg md:text-xl flex items-center space-x-2"
                aria-label="Link to David Dylan's GitHub Profile"
                >
                  <BsGithub className="inline text-xl md:text-2xl" /> <span>GitHub</span>
              </a>
              <a
                href="https://www.daviddylancarr.com/wp-content/uploads/2023/02/DavidCarr_Resume_Nov2023.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-white text-lg md:text-xl flex items-center space-x-2"
                aria-label="Link to David Dylan's Resume"
                >
                  <BsFillFileEarmarkPdfFill className="inline text-xl md:text-2xl" /> <span>Resume</span>
              </a>
            </div>
          </div>
          )
        }
      </div>
      <div className="absolute bottom-0 right-0 m-4 z-30">
        <button className="bg-gray-500 hover:bg-red-500 text-white p-2 rounded-md flex items-center space-x-2"
          onClick={() => setShowInfo(!showInfo)}
          ><TbInfoHexagon /> <span>Info</span></button>
      </div>
      </Suspense>
    </main>
  );
}

export default App;
