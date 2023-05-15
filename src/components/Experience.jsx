import React from 'react'
import { useMemo, useState, useEffect } from 'react'
import { TextureLoader } from 'three'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

import Card from './models/Card'
import Player from './models/Player'
import Board from './models/Board'
import BoardCollider from './models/BoardCollider'
import TableCollider from './models/TableCollider'
import Dice from './models/Dice'
import ThreeLogo from './models/ThreeLogo'
import Rubiks from './models/Rubiks'

import { boardPositionsArray } from '../data/boardPositions'

import { useGame } from '../hooks/useGame'

const preloadTextures  = async () => {
    const textureLoader = new TextureLoader()

    const images = [
        './textures/card_1.png',
        './textures/card_2.png',
        './textures/card_3.png',
        './textures/card_4.png',
        './textures/card_5.png',
        './textures/card_6.png',
        './textures/card_7.png',
        './textures/card_8.png',
        './textures/card_9.png',
        './textures/card_10.png',
        './textures/card_11.png',
        './textures/card_12.png',
        './textures/card_13.png',
        './textures/card_14.png',
        './textures/card_15.png',
        './textures/card_16.png',
        './textures/card_17.png',
        './textures/card_18.png',
        './textures/card_19.png',
        './textures/card_20.png',
        './textures/card_21.png',
        './textures/card_22.png',
        './textures/card_23.png',
        './textures/card_24.png',
        './textures/card_25.png',
        './textures/card_26.png',
    ]

    const loadImages = images.map(image => 
        new Promise((resolve, reject) => 
            textureLoader.load(image, resolve, undefined, reject)
        )
    )

    return await Promise.all(loadImages)
}

export default function Experience() {

    const [ playerStep ] = useGame(state => [state.playerState.playerStep])

    const [ cardTextures, setCardTextures ] = useState([])

    const preload = {
        card: useGLTF('./glb/Card.glb'),
    }

    useEffect(() => {
        preloadTextures().then(textures => setCardTextures(textures)).catch(err => console.log(err))
    }, [])

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
                position={[0, 5, 0]}
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


            {/* Cards */}
            {
                cardPositions.map((cardPosition, index) => {
                    const { position, rotation } = cardPosition
                    return (
                        <Card 
                            key={index}
                            index={index}
                            startPosition={position}
                            startRotation={rotation}
                            flippedRotation={cardPosition.flippedRotation}
                            spawnPosition={[0, 10, 0]}
                            glb={preload.card}
                            textures={cardTextures}
                            />
                    )
                })
            }


            {/* Player */}
            <Player />
    
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
                <Dice position={[0, 0.25, 0]} />
            </Physics>
        </>
    )
}