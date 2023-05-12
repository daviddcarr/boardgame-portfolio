import { useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import { boardPositionsArray } from '../../data/boardPositions'

export default function Player({ currentStep }) {

    const [nextStep, setNextStep] = useState(0)

    const glb = useGLTF('./glb/Player.glb')
    const { actions } = useAnimations(glb.animations, glb.scene)
    const { PlayerJump } = actions

    useEffect(() => {
        glb.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
            }
        })
    }, [glb])

    useEffect(() => {
        if (currentStep > nextStep) {
            setNextStep(nextStep + 1)
        }
    }, [currentStep])

    const { animatedPosition } = useSpring({ 
        animatedPosition: boardPositionsArray[nextStep],
        config: { duration: 1000 },
        onStart: () => { 
            PlayerJump.reset().play()
        },
        onRest: () => {
            PlayerJump.stop()
            if (nextStep < currentStep) {
                setNextStep(nextStep + 1)
            }
        },
    })

    return (
        <animated.group
            position={animatedPosition}
            geometry={glb.nodes.Player.geometry}
            material={glb.nodes.Player.material}
            >
            <primitive
                object={glb.scene}
                />
        </animated.group>

    )
}
