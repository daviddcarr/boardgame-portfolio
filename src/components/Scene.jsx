import { Canvas }  from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

import Experience from './Experience'

export  default function Scene({ setFlipped, flipped, playerStep, setPlayerStep }) {
    

    return (
        <Canvas
            shadows
            camera={{ position: [0, 4, 10], fov: 50 }}
            >

        <ambientLight intensity={0.25} />

        <directionalLight
          position={[0, 5, 1]}
          intensity={1}
          castShadow
          />

        <Environment preset="city" />

        <OrbitControls
        maxPolarAngle={Math.PI / 2 - 0.1}
          maxDistance={25}
          minDistance={5}
          enablePan={false}
          />

        <Experience
            setFlipped={setFlipped}
            flipped={flipped}
            playerStep={playerStep}
            setPlayerStep={setPlayerStep}
            />

      </Canvas>
    )
}