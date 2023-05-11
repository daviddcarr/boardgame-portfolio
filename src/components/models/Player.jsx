import { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import { boardPositionsArray } from '../../data/boardPositions'

export default function Player({ currentStep }) {

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

    const { animatedPosition } = useSpring({ 
        animatedPosition: boardPositionsArray[currentStep],
        config: { duration: 1000 },
        onStart: () => { 
            PlayerJump.reset().play()
        },
        onRest: () => {
            PlayerJump.stop() 
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
