import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import { RigidBody, MeshCollider } from '@react-three/rapier'

export default function TableCollider(props) {
    const gltf = useGLTF("glb/ColliderTable.glb")

    const gltfMesh = useMemo(() => {
        return gltf.nodes.ColliderTable
    }, [gltf])

    return (
        <RigidBody
        type="fixed"
        >
            <MeshCollider type="trimesh">
                <mesh
                    geometry={gltfMesh.geometry}
                    >
                    <meshStandardMaterial
                        attadch="material"
                        color={gltfMesh.material.color}
                        transparent={true}
                        opacity={0}
                        />
                </mesh>
            </MeshCollider>
        </RigidBody>
    )
}