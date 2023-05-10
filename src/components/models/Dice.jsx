import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

import { diceFaces } from "../../data/diceFaces"
import { boardPositionsArray } from "../../data/boardPositions"

export default function Dice({viewport, setTotal}) {

    const ref = useRef()

    const [ hasStopped, setHasStopped ] = useState(true)
    const [ hasBeenRolled, setHasBeenRolled ] = useState(false)

    const diceGlb = useGLTF('./glb/d6.glb')

    const diceMesh = useMemo(() => {
        return diceGlb.nodes["D6"]
    }, [diceGlb])

    const xStrength = 1
    const zStrength = 1

    const handleClick = () => {
        console.log('click')

        setHasBeenRolled(true)

        if ( hasStopped ) {
            console.log('and has stopped')
            
            const velocity = new THREE.Vector3()
            velocity.x = Math.random() * xStrength - (xStrength / 2)
            velocity.y = Math.random() * 1
            velocity.z = Math.random() * zStrength - (zStrength / 2)

            console.log(velocity)
            
            const torque = new THREE.Vector3()
            torque.x = Math.random() * 0.5 - 0.25
            torque.y = Math.random() * 0.5 - 0.25
            torque.z = Math.random() * 0.5 - 0.25
            
            ref.current.applyImpulse(velocity, true)
            ref.current.applyTorqueImpulse(torque, true)

            setHasStopped(false)
        }
    }


    useFrame(() => {
        const vel = ref.current.linvel()
        const velVector = new THREE.Vector3(vel.x, vel.y, vel.z)

        if ( ref.current && velVector.length() < 0.01) {
            
            if ( !hasStopped && hasBeenRolled ) {
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

                setTotal((prevTotal) => {
                    const newTotal = prevTotal + faceValue
                    return newTotal > boardPositionsArray.length - 1 ? boardPositionsArray.length - 1 : newTotal
                });
                setHasStopped(true)

                console.log("Face value: ", faceValue)
            }
        }
    })


    return (
        <RigidBody 
            ref={ref} 
            type="dynamic"
            colliders="cuboid"
            position={[-8, 1, 0]}
            rotation={[0, 0, Math.PI * 0.5]}
            friction={0.5}
            mass={5}
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