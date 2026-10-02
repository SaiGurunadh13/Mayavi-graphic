import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export default function HeroModel({ mouse, ...props }) {
  const group = useRef()
  const { scene } = useGLTF('/models/vrlogo.glb')
  
  // Clone the scene so it can be reused across multiple canvases
  const clonedScene = useMemo(() => scene.clone(true), [scene])
  
  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    
    // Gentle float
    group.current.position.y = Math.sin(t * 0.5) * 0.15
    
    // Very slow auto rotation
    group.current.rotation.y += delta * 0.08
    
    // Mouse follow (smooth interpolation)
    if (mouse) {
      const targetRotX = mouse.y * 0.15
      const targetRotZ = mouse.x * -0.05
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05)
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotZ, 0.05)
    }
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  )
}

export { HeroModel }

useGLTF.preload('/models/vrlogo.glb')
