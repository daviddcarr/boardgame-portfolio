import React from 'react'
import { useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Environment, useHelper } from '@react-three/drei'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'

import Card from './models/Card'
import Player from './models/Player'
import Board from './models/Board'
import BoardCollider from './models/BoardCollider'
import TableCollider from './models/TableCollider'
import Dice from './models/Dice'

import { boardPositionsArray } from '../data/boardPositions'

export default function Experience({ setFlipped, flipped, playerStep, setPlayerStep }) {

    const [ viewport ] = useThree((state) => [state.viewport])


    const rectLight = useRef()

    useHelper(rectLight, RectAreaLightHelper, 'red')


    const cardPositions = useMemo(() => {
        const positions = []
        for (let i = 0; i < playerStep; i++) {
            const  positionRotation = {
                position: [
                    Math.sin(((Math.PI * 2) / (boardPositionsArray.length - 1)) * i) * 9.5,
                    0.025,
                    Math.cos(((Math.PI * 2) / (boardPositionsArray.length - 1)) * i) * 9.5
                ],
                rotation: [
                    -Math.PI / 2,
                    0,
                    ((Math.PI * 2) / (boardPositionsArray.length - 1)) * i + Math.PI / 2,
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
                            flipped={flipped}
                            onClick={() => setFlipped(!flipped)} 
                            // startPosition={[8.5, 0.025, 0]}
                            startPosition={position}
                            startRotation={rotation}
                            spawnPosition={[0, 10, 0]}
                            />
                    )
                })
            }


            {/* Player */}
            <Player currentStep={playerStep} />
    
            {/* Board */}
            <Board />
        
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