import { useEffect, useState, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import planetCatalogue from "./data/planetCatalogue";
import * as THREE from "three";

function CameraController({ orbitControlsRef, currentPlanet, galaxyView }) {
  const { camera } = useThree();

  // Define planet and galaxy positions
  const planetPosition = planetCatalogue[currentPlanet].position;
  const cameraDist = planetCatalogue[currentPlanet].cameraDist;
  const planetCameraPos = new THREE.Vector3(planetPosition[0], 0, cameraDist);

  const galaxyCameraPos = new THREE.Vector3(-79983, 15415, 18007);
  const galaxyTargetPos = new THREE.Vector3(0, 0, 0); // Center of the galaxy

  // Track the previous camera position
  const prevCameraPos = useRef(new THREE.Vector3());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const targetPosition = galaxyView ? galaxyCameraPos : planetCameraPos;

    // Check if position has changed
    if (!prevCameraPos.current.equals(targetPosition)) {
      setIsAnimating(true);
      prevCameraPos.current.copy(targetPosition);
    }
  }, [galaxyView, currentPlanet]);

  useFrame(() => {
    if (!isAnimating || !orbitControlsRef.current) return;

    const newCamPos = galaxyView ? galaxyCameraPos : planetCameraPos;
    const newTargetPos = galaxyView
      ? galaxyTargetPos
      : new THREE.Vector3(...planetPosition);

    // Interpolate camera position smoothly
    camera.position.lerp(newCamPos, 0.1);

    // Interpolate orbit target
    orbitControlsRef.current.target.lerp(newTargetPos, 0.1);
    orbitControlsRef.current.update();

    // Stop animation when close enough
    if (camera.position.distanceTo(newCamPos) < 1.5) {
      setIsAnimating(false);
      orbitControlsRef.current.enabled = true;
    } else {
      orbitControlsRef.current.enabled = false;
    }
  });

  return null;
}

export default CameraController;
