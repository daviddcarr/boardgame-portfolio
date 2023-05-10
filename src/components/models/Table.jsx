import { useGLTF } from "@react-three/drei"

export default function Table(props) {
    const gltf = useGLTF("glb/Floor_Table.glb")
    return (
        <primitive
            object={gltf.scene}
            />
    )
}