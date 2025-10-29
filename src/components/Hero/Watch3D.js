'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function WatchModel() {
  const { scene } = useGLTF('/Assets/sat/scene.gltf')
  
  return (
    <primitive
      object={scene.clone()} 
      scale={25}
      position={[0, -1.3, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export default function Watch3D() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      orthographic
      gl={{ 
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true // KRITIČNO za konzistentnost
      }}
      camera={{ 
        position: [0, 0, 3.5], 
        zoom: 100, 
        near: 0.1, 
        far: 100,
        manual: false // Automatsko ažuriranje kamere
      }}
      dpr={1} // Fiksni pixel ratio
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

// Preload
useGLTF.preload('/Assets/sat/scene.gltf')