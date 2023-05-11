import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'


export default function Card({ startPosition, startRotation, spawnPosition }) {
  const { camera } = useThree();
  
  const [ flipped, setFlipped ] = useState(false)
  
  const glb = useGLTF('./glb/Card.glb')

  const cardMesh = useMemo(() => {
    return glb.nodes.Card
  }, [glb])

  const targetRotation = useRef(new THREE.Quaternion())
  const cardRef = useRef();

  const originalPosition = useMemo(() => {
      return new THREE.Vector3(...startPosition)
  }, [startPosition])
  const originalRotation = useMemo(() => {
      return new THREE.Quaternion().setFromEuler(new THREE.Euler(...startRotation))
  }, [startRotation])

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
    })
  
  return (
    <mesh
      castShadow
      ref={cardRef} 
      position={spawnPosition}
      onClick={() => setFlipped(!flipped)}
      geometry={cardMesh.geometry}
      material={cardMesh.material}
      />
  )
}
  