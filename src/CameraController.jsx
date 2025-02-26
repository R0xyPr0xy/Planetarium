import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function CameraController({ cameraPosition }) {
  const { camera, invalidate } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    // camera.lookAt(0, 0, 0);
    invalidate();
  }, [cameraPosition]);

  return null;
}

export default CameraController;
