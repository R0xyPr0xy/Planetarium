import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
// @ts-ignore
import CameraController from "./CameraController";
// @ts-ignore
import RaycastHandler from "./components/RaycastHandler";
import planetCatalogue from "./data/planetCatalogue.json";
// @ts-ignore
import PlanetLoader from "./components/PlanetLoader";
// @ts-ignore
import OrbitLines from "./components/OrbitLines";
// @ts-ignore
import Skybox from "./components/Skybox";
import { Planet } from "./types";

type SceneProps = {
  currentPlanet: Planet;
  setCurrentPlanet: (value: Planet) => void;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  galaxyView: boolean;
  setGalaxyView: (value: boolean) => void;
};

const Scene = (props: SceneProps) => {
  const {
    currentPlanet,
    setCurrentPlanet,
    showSidebar,
    setShowSidebar,
    galaxyView,
    setGalaxyView,
  } = props;
  // Get camera distance to planet
  const cameraDist = planetCatalogue[currentPlanet].cameraDist;

  const orbitControlsRef = useRef<any>(null);

  return (
    <Canvas
      camera={{
        position: [0, 0, cameraDist],
        near: 100,
        far: 10000000,
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
      <directionalLight position={[-10, 5, 5]} intensity={1.7} />

      {/* Imported 3D Model */}
      <PlanetLoader currentPlanet={currentPlanet} />

      {galaxyView && <OrbitLines />}

      <Skybox />

      {/* Controls */}
      <OrbitControls ref={orbitControlsRef} />
    </Canvas>
  );
};

export default Scene;
