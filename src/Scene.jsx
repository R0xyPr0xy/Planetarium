import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import CameraController from "./CameraController";
import planetCatalogue from "./PlanetData";

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
      rotation={[20, Math.PI, 0]}
    />
  );
};

const PlanetTest = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/earth.glb");
  const planetTestRef = useRef();

  useFrame(() => {
    if (planetTestRef.current) {
      planetTestRef.current.rotation.x += 0.0002;
      planetTestRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={planetTestRef}
      scale={[1, 1, 1]}
      position={[2800, 0, 0]}
      rotation={[20, Math.PI, 0]}
    />
  );
};

const Planets = () => {
  return (
    <>
      <Planet />
      <PlanetTest />
    </>
  );
};

const Scene = ({ cameraPosition }) => {
  return (
    <Canvas camera={{ position: [0, 0, 1200], near: 0.01, far: 100000 }}>
      <CameraController cameraPosition={cameraPosition} />

      {/* Basic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.7} />

      {/* Imported 3D Model */}
      <Planets />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
