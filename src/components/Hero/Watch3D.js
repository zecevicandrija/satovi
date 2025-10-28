'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function WatchModel() {
  const { scene } = useGLTF('/Assets/sat/scene.gltf')
  const primitiveRef = useRef()

  useEffect(() => {
    if (primitiveRef.current) {
      const box = new THREE.Box3().setFromObject(primitiveRef.current)
      const center = box.getCenter(new THREE.Vector3())
      primitiveRef.current.position.set(-center.x, -center.y, -center.z)  // Automatski centriraj
    }
  }, [scene])
  
  return (
    <primitive
      ref={primitiveRef}
      object={scene} 
      scale={25}
      position={[0, -1.3, 0]}  // Centrirano u sredini scene
      rotation={[0,0, 0]}  // Zadržana rotacija za lepši ugao; promeni u [0,0,0] ako treba ravno
    />
  )
}

export default function Watch3D() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      orthographic  // Omogući ortografski mod za konstantnu veličinu bez perspektivne distorzije
      camera={{ position: [0, 0, 3.5], zoom: 100, near: 0.1, far: 100 }}  // Podešena ortografska kamera sa zoom-om za odgovarajuću veličinu
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
      
      {/* Podno svetlo za luksuz */}
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
        enableZoom={false}      // Veličina uvek ista
        enablePan={false}       // Ne pomera se horizontalno/vertikalno
        target={[0, 0, 0]}      // Rotira oko centra sata
        makeDefault             // Pamti kameru u centru za konzistentnost
        minDistance={3.5}       // Fiksiraj minimalnu udaljenost
        maxDistance={3.5}       // Fiksiraj maksimalnu udaljenost da se ne menja tokom rotacije
      />
    </Canvas>
  )
}