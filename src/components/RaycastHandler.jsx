import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const RaycastHandler = ({ setCurrentPlanet }) => {
  const { camera, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const onMouseDown = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let planetObj = intersects[0].object;

      // Get root object
      while (planetObj.parent && !planetObj.userData.planetName) {
        planetObj = planetObj.parent;
      }

      console.log("Clicked on " + planetObj.userData.planetName);

      if (planetObj.userData.planetName) {
        setCurrentPlanet(planetObj.userData.planetName);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, []);

  return null;
};

export default RaycastHandler;
