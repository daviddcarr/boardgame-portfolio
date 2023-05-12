import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

export default function Card({ index, activeCard, setActiveCard, startPosition, startRotation, spawnPosition, flippedRotation, glb, textures }) {
  const { camera } = useThree()
  
  // const [ flipped, setFlipped ] = useState(false)
  const [ hasFlipped, setHasFlipped ] = useState(false)
  const [ hovering, setHovering ] = useState(false)

  const flipped = useMemo(() => {
    return activeCard === index
  }, [activeCard, index])
  
  const cardMesh = useMemo(() => {
    glb.nodes.Card.material.side = THREE.FrontSide
    return glb.nodes.Card
  }, [glb])

  const cardTexture = useTexture(`./textures/card_${index+1}.png`)

  const cardMaterial = useMemo(() => {
    cardTexture.center.set(0.5, 0.5)
    cardTexture.rotation = Math.PI
    cardTexture.repeat.x = -1
    cardTexture.needUpdate = true

    const mat = new THREE.MeshBasicMaterial({
      map: cardTexture,
      side: THREE.FrontSide
    })
    return mat
  }, [cardTexture])

  const targetRotation = useRef(new THREE.Quaternion())
  const cardRef = useRef()

  const originalPosition = useMemo(() => {
      return new THREE.Vector3(...startPosition)
  }, [startPosition])
  const hoverPosition = useMemo(() => {
      return new THREE.Vector3(...startPosition).add(new THREE.Vector3(0, 0.1, 0))
  }, [startPosition])
  const originalRotation = useMemo(() => {
      return new THREE.Quaternion().setFromEuler(new THREE.Euler(...startRotation))
  }, [startRotation])
  const hasFlippedRotation = useMemo(() => {
      return new THREE.Quaternion().setFromEuler(new THREE.Euler(...flippedRotation))
  }, [flippedRotation])

  useFrame(() => {
      if (flipped) {
          const newPosition  = new THREE.Vector3(
              camera.position.x * 0.9,
              camera.position.y * 0.9,
              camera.position.z * 0.9
          )
          cardRef.current.position.lerp(newPosition, 0.1)
          
          targetRotation.current.setFromRotationMatrix(
              new THREE.Matrix4().lookAt(
                  cardRef.current.position,
                  camera.position,
                  cardRef.current.up
              )
          )
          cardRef.current.quaternion.slerp(targetRotation.current, 0.1)

      } else {
          cardRef.current.position.lerp(hovering ? hoverPosition : originalPosition, 0.1)
          cardRef.current.quaternion.slerp(hasFlipped ? hasFlippedRotation : originalRotation, 0.1)
      }
    })
  
  return (
        <mesh
          castShadow
          ref={cardRef} 
          position={spawnPosition}
          onClick={() => {
            if (activeCard === index) {
              setActiveCard(null)
            } else {
              setActiveCard(index)
            }
            setHasFlipped(true)
          }}
          onPointerEnter={() => {
            setHovering(true)
          }}
          onPointerLeave={() => {
            setHovering(false)
          }}
          geometry={cardMesh.geometry}
          material={cardMaterial}
          
          />
  )
}
  