import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

import { diceFaces } from "../../data/diceFaces"
import { boardPositionsArray } from "../../data/boardPositions"

export default function Dice({setTotal, updatePlayerRoll}) {

    const ref = useRef()

    const [hitSound] = useState(new Audio('./audio/hit.mp3'))

    const hasStoppedRef  = useRef(true)
    

    const diceGlb = useGLTF('./glb/d6.glb')

    const diceMesh = useMemo(() => {
        return diceGlb.nodes["D6"]
    }, [diceGlb])

    const xStrength = 1
    const zStrength = 1

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

            console.log("Dice is rolling...")
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

                console.log("Recalculating with new face value: ", faceValue)
                // setTotal((prevTotal) => {
                //     const newTotal = prevTotal + faceValue
                //     return newTotal > boardPositionsArray.length - 1 ? boardPositionsArray.length - 1 : newTotal
                // });
                updatePlayerRoll(faceValue)
                hasStoppedRef.current = true
            }
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