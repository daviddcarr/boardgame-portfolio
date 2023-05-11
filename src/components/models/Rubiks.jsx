import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

export default function Rubiks({position}) {

    const ref = useRef()
    const gltf = useGLTF("glb/Rubiks.glb")

    useFrame((state, delta) => {
        ref.current.rotation.y += 0.1 * delta
    })


    return  (
        <primitive
            position={position}
            ref={ref}
            object={gltf.scene}
            />
    )
}