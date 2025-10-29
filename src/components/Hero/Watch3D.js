'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function WatchModel() {
  const { scene } = useGLTF('/Assets/sat/scene.gltf')
  const primitiveRef = useRef()
  const [debugInfo, setDebugInfo] = useState(null)

  useEffect(() => {
    if (primitiveRef.current && scene) {
      const box = new THREE.Box3().setFromObject(primitiveRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      setDebugInfo({
        center: { x: center.x.toFixed(2), y: center.y.toFixed(2), z: center.z.toFixed(2) },
        size: { x: size.x.toFixed(2), y: size.y.toFixed(2), z: size.z.toFixed(2) }
      })
      
      // Primeni centriranje
      primitiveRef.current.position.set(-center.x, -center.y, -center.z)
    }
  }, [scene])
  
  return (
    <>
      <primitive
        ref={primitiveRef}
        object={scene} 
        scale={25}
        position={[0, -1.3, 0]}
        rotation={[0, 0, 0]}
      />
      
      {/* Debug helper - helper grid */}
      <gridHelper args={[10, 10]} position={[0, -1.3, 0]} />
      <axesHelper args={[2]} />
    </>
  )
}

export default function Watch3D() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      orthographic
      camera={{ position: [0, 0, 3.5], zoom: 100, near: 0.1, far: 100 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.7} />
      <pointLight position={[0, 3, 5]} intensity={1.2} color="#d4af37" />
      <spotLight 
        position={[3, 3, 3]} 
        angle={0.5} 
        penumbra={1} 
        intensity={1}
        color="#d4af37"
      />
      
      <pointLight 
        position={[0, -4, 0]}  
        intensity={0.8}        
        color="#d4af37"        
        distance={10}          
        decay={2}              
      />
      
      <Suspense fallback={null}>
        <WatchModel />
      </Suspense>
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
        makeDefault
        minDistance={3.5}
        maxDistance={3.5}
      />
    </Canvas>
  )
}

useGLTF.preload('/Assets/sat/scene.gltf')