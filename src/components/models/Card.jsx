import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

import { useGame } from '../../hooks/useGame'

export default function Card({ index, startPosition, startRotation, spawnPosition, flippedRotation, glb, textures }) {
  const { camera } = useThree()
  
  const [ hovering, setHovering ] = useState(false)

  const [ revealSound ] = useState(new Audio('./audio/card_reveal.wav'))
  const [ hideSound ] = useState(new Audio('./audio/card_hide.wav'))

  const [ 
    activeCard, 
    setActiveCard, 
    flippedCards, 
    setFlippedCards,
    initializedCards,
    setInitializedCards
    ] = useGame(state => [
      state.playerState.activeCard, 
      state.setActiveCard,
      state.playerState.flippedCards,
      state.setFlippedCards,
      state.playerState.initializedCards,
      state.setInitializedCards
    ])

  const flipped = useMemo(() => {
    return activeCard === index
  }, [activeCard, index])
  
  const cardMesh = useMemo(() => {
    glb.nodes.Card.material.side = THREE.FrontSide
    return glb.nodes.Card
  }, [glb])

  const startPositionVector = useMemo(() => {
    return new THREE.Vector3(...startPosition)
  }, [startPosition])

  useEffect(() => {
    document.body.style.cursor = hovering ? 'pointer' : 'auto'
  }, [hovering])

  const cardTexture = textures[index]

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
          if (!initializedCards.includes(index)) {
            if (cardRef.current.position.distanceTo(startPositionVector) < 0.01) {
              setInitializedCards(index)
            }
          }
          cardRef.current.position.lerp(hovering ? hoverPosition : originalPosition, 0.1)
          cardRef.current.quaternion.slerp(flippedCards.includes(index) ? hasFlippedRotation : originalRotation, 0.1)
      }
    })

  const playRevealSound = () => {
    revealSound.currentTime = 0
    revealSound.volume = 0.25
    revealSound.play()
  }

  const playHideSound = () => {
    hideSound.currentTime = 0
    hideSound.volume = 0.25
    hideSound.play()
  }


  const initializedRotation = useMemo(() => {
    return flippedCards.includes(index) ? flippedRotation : startRotation
  }, [flippedRotation, startRotation])
  
  return (
        <mesh
          castShadow
          ref={cardRef} 
          position={initializedCards.includes(index) ? startPosition : spawnPosition}
          rotation={initializedCards.includes(index) ? initializedRotation : [0, 0, 0]}
          onClick={() => {
            if (activeCard === index) {
              setActiveCard(null)
              playHideSound()
            } else {
              setActiveCard(index)
              playRevealSound()
            }
            setFlippedCards(index)
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
  