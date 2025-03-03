import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import CameraController from "./CameraController";
import RaycastHandler from "./components/RaycastHandler.jsx";
import planetCatalogue from "./data/planetCatalogue";
import PlanetLoader from "./components/PlanetLoader";
import OrbitLines from "./components/OrbitLines";

const Scene = ({
  currentPlanet,
  setCurrentPlanet,
  showSidebar,
  setShowSidebar,
  galaxyView,
  setGalaxyView,
}) => {
  // Get camera distance to planet
  const cameraDist = planetCatalogue[currentPlanet].cameraDist;

  const orbitControlsRef = useRef();

  return (
    <Canvas
      camera={{
        position: [0, 0, cameraDist],
        near: 100,
        far: 1500000,
        fov: 25,
      }}
    >
      <RaycastHandler
        currentPlanet={currentPlanet}
        setCurrentPlanet={setCurrentPlanet}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        setGalaxyView={setGalaxyView}
      />

      <CameraController
        currentPlanet={currentPlanet}
        orbitControlsRef={orbitControlsRef}
        galaxyView={galaxyView}
      />

      {/* Basic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.7} />

      {/* Imported 3D Model */}
      <PlanetLoader />

      {galaxyView && <OrbitLines />}

      {/* Controls */}
      <OrbitControls ref={orbitControlsRef} />
    </Canvas>
  );
};

export default Scene;
