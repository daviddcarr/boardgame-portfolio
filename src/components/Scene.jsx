import React from 'react'
import { Canvas }  from '@react-three/fiber'
import { EffectComposer, Vignette } from '@react-three/postprocessing'

import Experience from './Experience'


export  default function Scene({ setFlipped, flipped, playerStep, setPlayerStep }) {
    
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
                    setFlipped={setFlipped}
                    flipped={flipped}
                    playerStep={playerStep}
                    setPlayerStep={setPlayerStep}
                    />
            </Canvas>
    )
}

{/* (possible exports: Autofocus, Bloom, BrightnessContrast, ChromaticAberration, 
ColorAverage, ColorDepth, Depth, DepthOfField, DotScreen, EffectComposer, 
EffectComposerContext, Glitch, GodRays, Grid, HueSaturation, LUT, Noise, 
Outline, Pixelation, SMAA, SSAO, SSR, Scanline, Select, Selection, SelectiveBloom, 
Sepia, ShockWave, Texture, TiltShift, TiltShift2, TiltShiftEffect, ToneMapping, Vignette, 
resolveRef, selectionContext, useVector2, wrapEffect) */}