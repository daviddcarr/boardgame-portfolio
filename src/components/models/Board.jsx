import { useGLTF } from "@react-three/drei"

export default function Board(props) {
    const gltf = useGLTF("glb/Board.glb")
    return (
        <primitive
            object={gltf.scene}
            />
    )
}