import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import CameraController from "./CameraController";
import planetCatalogue from "./PlanetData";

const Sun = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/sun.glb");
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
      scale={[100, 100, 100]}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Mercury = () => {
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
      position={[2800, 0, 0]}
      rotation={[20, Math.PI, 0]}
    />
  );
};

const Earth = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/earth.glb");
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
      position={[5200, 0, 0]}
      rotation={[20, Math.PI, 0]}
    />
  );
};

const Planets = () => {
  return (
    <>
      <Sun />
      <Mercury />
      <Earth />
    </>
  );
};

const Scene = ({ currentPlanet }) => {
  // Get camera position dynamically
  const cameraPosition = [0, 0, planetCatalogue[currentPlanet].cameraDist];
  const planetPosition = planetCatalogue[currentPlanet].position;
  const orbitControlsRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 1200], near: 0.01, far: 100000 }}>
      <CameraController
        cameraPosition={cameraPosition}
        planetPosition={planetPosition}
      />

      {/* Basic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.7} />

      {/* Imported 3D Model */}
      <Planets />

      {/* Controls */}
      <OrbitControls ref={orbitControlsRef} />
    </Canvas>
  );
};

export default Scene;
