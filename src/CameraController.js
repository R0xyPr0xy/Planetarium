import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import planetCatalogue from "./data/planetCatalogue";

function CameraController({ orbitControlsRef, currentPlanet }) {
  const { camera, invalidate } = useThree();

  // Get current planet camera values
  const planetPosition = planetCatalogue[currentPlanet].position;
  const cameraDist = planetCatalogue[currentPlanet].cameraDist;
  const cameraPosition = [planetPosition[0], 0, cameraDist];

  // Changes the camera view based on focus
  useEffect(() => {
    camera.position.set(...cameraPosition);

    orbitControlsRef.current.target.set(...planetPosition);
    orbitControlsRef.current.update();
    invalidate();
  }, [cameraPosition, planetPosition, orbitControlsRef]);

  return null;
}

export default CameraController;
