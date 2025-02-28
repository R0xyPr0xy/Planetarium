import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import CameraController from "./CameraController";
import planetCatalogue from "./data/planetCatalogue";
import Planets from "./PlanetModels";
import RaycastHandler from "./components/RaycastHandler.jsx";

const Scene = ({
  currentPlanet,
  setCurrentPlanet,
  showSidebar,
  setShowSidebar,
}) => {
  // Get camera distance to planet
  const cameraDist = planetCatalogue[currentPlanet].cameraDist;

  const orbitControlsRef = useRef();

  return (
    <Canvas
      camera={{
        position: [0, 0, cameraDist],
        near: 0.01,
        far: 100000,
        fov: 25,
      }}
    >
      <RaycastHandler
        setCurrentPlanet={setCurrentPlanet}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />

      <CameraController
        currentPlanet={currentPlanet}
        orbitControlsRef={orbitControlsRef}
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
