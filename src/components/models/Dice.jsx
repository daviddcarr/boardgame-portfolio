import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

import { diceFaces } from "../../data/diceFaces"

import { useGame } from "../../hooks/useGame"

export default function Dice() {

    const ref = useRef()

    const [ updatePlayerRoll ] = useGame(state => [ state.updatePlayerRoll ])

    const [hitSound] = useState(new Audio('./audio/hit.mp3'))
    const [hovered, setHovered] = useState(false)

    const hasStoppedRef  = useRef(true)
    

    const diceGlb = useGLTF('./glb/d6.glb')

    const diceMesh = useMemo(() => {
        return diceGlb.nodes["D6"]
    }, [diceGlb])

    const xStrength = 1
    const zStrength = 1

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const handleClick = () => {

        if ( hasStoppedRef.current ) {
            
            const velocity = new THREE.Vector3()
            velocity.x = Math.random() * xStrength - (xStrength / 2)
            velocity.y = Math.random() * 1
            velocity.z = Math.random() * zStrength - (zStrength / 2)
            
            const torque = new THREE.Vector3()
            torque.x = Math.random() * 0.5 - 0.25
            torque.y = Math.random() * 0.5 - 0.25
            torque.z = Math.random() * 0.5 - 0.25
            
            ref.current.applyImpulse(velocity, true)
            ref.current.applyTorqueImpulse(torque, true)

            hasStoppedRef.current = false
        }
    }

    useFrame(() => {
        const vel = ref.current.linvel()
        const velVector = new THREE.Vector3(vel.x, vel.y, vel.z)

        if ( ref.current && velVector.length() < 0.01) {
            
            if (!hasStoppedRef.current) {
                const rot = ref.current.rotation()

                let faceValue = 0
                let highestY = -Infinity

                diceFaces["d6"].forEach((face, index) => {

                    const facePos = new THREE.Vector3(face[0], face[1], face[2])

                    const localPos = new THREE.Vector3().copy(facePos)
                    localPos.applyQuaternion(rot)


                    if (localPos.y > highestY) {
                        faceValue = index + 1
                        highestY = localPos.y
                    }
                });

                updatePlayerRoll(faceValue)
                hasStoppedRef.current = true
            }
        } else if ( ref.current.translation().y < -3 ) {
            // Reset dice if it falls off the table
            ref.current.setTranslation({x:0, y:0.25, z:8})
            ref.current.setLinvel({x:0, y:0, z:0})
            ref.current.setAngvel({x:0, y:0, z:0})
            hasStoppedRef.current = true
        }
    })

    const playHitSound = () => {
        const vel = ref.current.linvel()
        const velVector = new THREE.Vector3(vel.x, vel.y, vel.z)

        hitSound.currentTime = 0
        hitSound.volume = Math.min(velVector.length() / 10, 1)
        hitSound.play()
    }


    return (
        <RigidBody 
            ref={ref} 
            type="dynamic"
            colliders="cuboid"
            position={[0, 0.25, 8]}
            rotation={[0, 0, Math.PI * 0.5]}
            friction={0.5}
            mass={5}
            onCollisionEnter={playHitSound}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            >
            <mesh
                geometry={diceMesh.geometry}
                material={diceMesh.material}
                castShadow
                onClick={handleClick}
                >
            </mesh>

        </RigidBody>
    )
}