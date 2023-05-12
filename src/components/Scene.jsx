import React from 'react'
import { Canvas }  from '@react-three/fiber'
import { EffectComposer, Vignette } from '@react-three/postprocessing'

import Experience from './Experience'


export  default function Scene({ activeCard, setActiveCard, playerStep, setPlayerStep }) {
    
    return (
            <Canvas
                shadows={true}
                camera={{ position: [0, 4, 14], fov: 50 }}
                className="z-10"
                >
                <EffectComposer>
                    <Vignette offset={0.1} darkness={0.7} />
                </EffectComposer>

                <Experience
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                    playerStep={playerStep}
                    setPlayerStep={setPlayerStep}
                    />
            </Canvas>
    )
}