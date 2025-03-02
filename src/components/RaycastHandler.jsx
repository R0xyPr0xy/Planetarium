import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const RaycastHandler = ({
  currentPlanet,
  setCurrentPlanet,
  setShowSidebar,
  showSidebar,
  setGalaxyView,
}) => {
  const { camera, scene, size } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // Single click
  const onObjectClicked = (event) => {
    console.log(camera.position);

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

      let newPlanet = planetObj.userData.planetName;

      if (newPlanet) {
        if (!showSidebar && newPlanet != currentPlanet) {
          setShowSidebar(true);
        }
        setGalaxyView(false);
        setCurrentPlanet(newPlanet);
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
    window.addEventListener("mousedown", onObjectClicked);
    window.addEventListener("dblclick", onDoubleClick);

    return () => {
      window.removeEventListener("mousedown", onObjectClicked);
      window.removeEventListener("dblclick", onDoubleClick);
    };
  }, [size, showSidebar]);

  return null;
};

export default RaycastHandler;
