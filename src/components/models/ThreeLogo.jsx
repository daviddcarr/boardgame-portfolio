import { useRef } from "react"
import { useGLTF, Float } from "@react-three/drei"

export default function ThreeLogo({position}) {

    const ref = useRef()
    const gltf = useGLTF("glb/ThreeLogo.glb")

    return  (
        <Float
            speed={0.5}
            floatIntensity={0.1}
            floatingRange={[1.4, 1.6]}
            >
            <primitive
                position={position}
                ref={ref}
                object={gltf.scene}
                />
        </Float>
    )
}