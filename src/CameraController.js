import { useEffect, useState, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import planetCatalogue from "./data/planetCatalogue";
import * as THREE from "three";

function CameraController({ orbitControlsRef, currentPlanet }) {
  const { camera, invalidate } = useThree();

  // Get current planet camera
  const planetPosition = planetCatalogue[currentPlanet].position;
  const cameraDist = planetCatalogue[currentPlanet].cameraDist;
  const cameraPosition = [planetPosition[0], 0, cameraDist];

  // Track previous camera position
  const prevCameraPos = useRef(new THREE.Vector3(...cameraPosition));

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if position has changed
    if (!prevCameraPos.current.equals(new THREE.Vector3(...cameraPosition))) {
      setIsAnimating(true);
      prevCameraPos.current.set(...cameraPosition);
    }
  }, [cameraPosition]);

  useFrame(() => {
    if (!isAnimating || !orbitControlsRef.current) return;

    const newCamPos = new THREE.Vector3(...cameraPosition);
    const newTargetPos = new THREE.Vector3(...planetPosition);

    // Interpolate camera position
    camera.position.lerp(newCamPos, 0.1);

    // Interpolate orbit target
    orbitControlsRef.current.target.lerp(newTargetPos, 0.1);
    orbitControlsRef.current.update();

    // Stop animation when near
    if (camera.position.distanceTo(newCamPos) < 0.8) {
      setIsAnimating(false);
      orbitControlsRef.current.enabled = true;
    } else {
      orbitControlsRef.current.enabled = false;
    }
  });

  return null;
}

export default CameraController;
