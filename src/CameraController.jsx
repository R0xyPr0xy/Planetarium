import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function CameraController({
  cameraPosition,
  planetPosition,
  orbitControlsRef,
}) {
  const { camera, controls, invalidate } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(planetPosition);
    orbitControlsRef.current.target.set(...planetPosition);
    orbitControlsRef.current.update();
    invalidate();
  }, [cameraPosition, planetPosition, orbitControlsRef]);

  return null;
}

export default CameraController;
