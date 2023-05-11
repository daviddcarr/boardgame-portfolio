import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import { RigidBody } from '@react-three/rapier'


export default function BoardCollider(props) {
    const gltf = useGLTF("glb/ColliderBoard.glb")

    const gltfMeshes = useMemo(() => {
        return gltf.nodes.ColliderBoard
    }, [gltf])

    return (

        <RigidBody
            type="fixed"
            colliders="trimesh"
            >
            <mesh
                geometry={gltfMeshes.geometry}
                >
                <meshStandardMaterial
                    attach="material"
                    color={gltfMeshes.material.color}
                    transparent={true}
                    opacity={0}
                    />
            </mesh>
        </RigidBody>
    )
}