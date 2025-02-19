import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";

const Planet = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/mercury.glb");
  const planetRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x += 0.0002;
      planetRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={planetRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
      rotation={[20, Math.PI, 50]}
    />
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1200] }}>
      {/* Basic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.9} />

      {/* Imported 3D Model */}
      <Planet />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
