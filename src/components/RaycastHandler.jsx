import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const RaycastHandler = ({ setCurrentPlanet, setShowSidebar, showSidebar }) => {
  const { camera, scene, size } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // Single click
  const onMouseDown = (event) => {
    // Pointer is based on canvas size
    pointer.x = (event.clientX / size.width) * 2 - 1;
    pointer.y = -(event.clientY / size.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let planetObj = intersects[0].object;

      // Get root object
      while (planetObj.parent && !planetObj.userData.planetName) {
        planetObj = planetObj.parent;
      }

      if (planetObj.userData.planetName) {
        setCurrentPlanet(planetObj.userData.planetName);
      }
    }
  };

  // Double click
  const onDoubleClick = (event) => {
    // Pointer is based on canvas size
    pointer.x = (event.clientX / size.width) * 2 - 1;
    pointer.y = -(event.clientY / size.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let planetObj = intersects[0].object;

      // Get root object
      while (planetObj.parent && !planetObj.userData.planetName) {
        planetObj = planetObj.parent;
      }

      if (planetObj.userData.planetName) {
        setCurrentPlanet(planetObj.userData.planetName);
      }

      setShowSidebar(!showSidebar);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("dblclick", onDoubleClick);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("dblclick", onDoubleClick);
    };
  }, [size, showSidebar]);

  return null;
};

export default RaycastHandler;
