import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/student.glb');
  return <primitive object={scene} scale={3.5} position={[0, -1.2, 0]} />;
}

export default function StudentModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls autoRotate enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
