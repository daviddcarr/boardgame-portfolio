import { useGLTF } from "@react-three/drei"

const excludedMeshes = [
    'Table_Wood',
    'Table_Felt',
    'HexPlatform_LittleRock',
    'HexPlatform_Dallas',
]

export default function Board(props) {
    const gltf = useGLTF("glb/Board.glb")

    // enable shadows for all meshes
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.receiveShadow = true
            if ( !excludedMeshes.includes(child.name) ) {
                child.castShadow = true
            }
        }
    })

    return (
        <primitive
            object={gltf.scene}
            />
    )
}