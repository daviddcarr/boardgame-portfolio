import React from 'react'
import { useMemo, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Environment, useHelper, useGLTF } from '@react-three/drei'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'

import Card from './models/Card'
import Player from './models/Player'
import Board from './models/Board'
import BoardCollider from './models/BoardCollider'
import TableCollider from './models/TableCollider'
import Dice from './models/Dice'
import ThreeLogo from './models/ThreeLogo'
import Rubiks from './models/Rubiks'

import { boardPositionsArray } from '../data/boardPositions'

export default function Experience({ setFlipped, flipped, playerStep, setPlayerStep }) {

    const [ activeCard, setActiveCard ] = useState(null)

    const [ viewport ] = useThree((state) => [state.viewport])

    const rectLight = useRef()

    useHelper(rectLight, RectAreaLightHelper, 'red')

    const preload = {
        card: useGLTF('./glb/Card.glb'),
    }

    const cardPositions = useMemo(() => {
        const positions = []
        for (let i = 0; i < playerStep; i++) {
            const  positionRotation = {
                position: [
                    Math.sin(((Math.PI * 2) / (boardPositionsArray.length - 1)) * i) * 9.5,
                    0.3,
                    Math.cos(((Math.PI * 2) / (boardPositionsArray.length - 1)) * i) * 9.5
                ],
                rotation: [
                    -Math.PI / 2,
                    0,
                    ((Math.PI * 2) / (boardPositionsArray.length - 1)) * i,
                ],
                flippedRotation: [
                    Math.PI / 2,
                    0,
                    Math.PI - (((Math.PI * 2) / (boardPositionsArray.length - 1)) * i),
                ]
            }
            positions.push(positionRotation)
        }
        return positions
    }, [playerStep])

    return (
        <>
            <directionalLight
                position={[0, 5, 1]}
                intensity={0.5}
                castShadow
                shadow-camera-top={12}
                shadow-camera-right={12}
                shadow-camera-bottom={-12}
                shadow-camera-left={-12}
                shadow-mapSize-width={2048}
                shadow-bias={-0.0005}
                />


            <Environment preset="warehouse" />

            <OrbitControls
                maxPolarAngle={Math.PI / 2 - 0.1}
                maxDistance={25}
                minDistance={5}
                enablePan={false}
                />


            {/* Card */}
            {
                cardPositions.map((cardPosition, index) => {
                    const { position, rotation } = cardPosition
                    return (
                        <Card 
                            key={index}
                            index={index}
                            // flipped={index === activeCard}
                            activeCard={activeCard}
                            setActiveCard={setActiveCard}
                            startPosition={position}
                            startRotation={rotation}
                            flippedRotation={cardPosition.flippedRotation}
                            spawnPosition={[0, 10, 0]}
                            glb={preload.card}
                            />
                    )
                })
            }


            {/* Player */}
            <Player currentStep={playerStep} />
    
            {/* Board */}
            <Board />
            <ThreeLogo position={[2.3655, 1.5954, 1.3526]} />
            <Rubiks position={[-3.7151, 1.1496, 1.9436]} />
        
            {/* Physics */}
            <Physics
                timeSet="vary"
                timeStep="vary"
                >
                <TableCollider />
                <BoardCollider />
                <Dice viewport={viewport} setTotal={setPlayerStep} position={[0, 0.25, 0]} />
            </Physics>
        </>
    )
}