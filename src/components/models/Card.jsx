import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber';


export default function Card({ startPosition, startRotation, spawnPosition }) {

    const [ flipped, setFlipped ] = useState(false)

    const { camera } = useThree();

    const cardRef = useRef();
    const targetRotation = useRef(new THREE.Quaternion())

    const originalPosition = useMemo(() => {
        return new THREE.Vector3(...startPosition)
    }, [])
    const originalRotation = useMemo(() => {
        return new THREE.Quaternion().setFromEuler(new THREE.Euler(...startRotation))
    }, [])

    useFrame(() => {
        if (flipped) {
            const newPosition  = new THREE.Vector3(
                camera.position.x * 0.9,
                camera.position.y * 0.9,
                camera.position.z * 0.9
            )
            cardRef.current.position.lerp(newPosition, 0.1);
            
            targetRotation.current.setFromRotationMatrix(
                new THREE.Matrix4().lookAt(
                    cardRef.current.position,
                    camera.position,
                    cardRef.current.up
                )
            )
            cardRef.current.quaternion.slerp(targetRotation.current, 0.1)

        } else {
            cardRef.current.position.lerp(originalPosition, 0.1);
            cardRef.current.quaternion.slerp(originalRotation, 0.1)
        }
      });
  
    return (
      <group 
        ref={cardRef} 
        onClick={() => setFlipped(!flipped)}
        position={spawnPosition}
        >
        {/* Front Face */}
        <mesh castShadow position={[0, 0, -0.0001]}>
          <planeGeometry args={[2, 1.5]} />
          <meshStandardMaterial color="green" side={2} />
        </mesh>
  
        {/* Back Face */}
        <mesh castShadow position={[0, 0, 0.0001]}>
          <planeGeometry args={[2, 1.5]} />
          <meshStandardMaterial color="red" side={2} />
        </mesh>
      </group>
    );
  }
  