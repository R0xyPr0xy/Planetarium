import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import CameraController from "./CameraController";
import RaycastHandler from "./components/RaycastHandler.jsx";
import planetCatalogue from "./data/planetCatalogue";
// import PlanetsModels from "./PlanetModels";
import PlanetLoader from "./components/PlanetLoader";

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
        near: 0.1,
        far: 1000000,
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
      <PlanetLoader />

      {/* Controls */}
      <OrbitControls ref={orbitControlsRef} />
    </Canvas>
  );
};

export default Scene;
