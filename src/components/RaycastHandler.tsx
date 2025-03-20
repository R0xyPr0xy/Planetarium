import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import planetCatalogue from "../data/planetCatalogue.json";
import { Planet } from "../types";

function planetCheck(objName: string) {
  for (const key of Object.keys(planetCatalogue)) {
    if (key === objName) {
      return true;
    }
  }
  return false;
}

type RaycastHandlerProps = {
  currentPlanet: Planet;
  setCurrentPlanet: (value: Planet) => void;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  setGalaxyView: (value: boolean) => void;
};

const RaycastHandler = ({
  currentPlanet,
  setCurrentPlanet,
  setShowSidebar,
  showSidebar,
  setGalaxyView,
}: RaycastHandlerProps) => {
  const { camera, scene, size } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // Single click
  const onObjectClicked = (event: MouseEvent) => {
    // Pointer is based on canvas size
    pointer.x = (event.clientX / size.width) * 2 - 1;
    pointer.y = -(event.clientY / size.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let object = intersects[0].object;

      // Get root object
      while (object.parent && !object.userData.planetName) {
        object = object.parent;
      }

      let newPlanet = object.userData.planetName;
      const isPlanet = planetCheck(newPlanet);

      if (newPlanet && isPlanet) {
        if (!showSidebar && newPlanet != currentPlanet) {
          setShowSidebar(true);
        }
        setGalaxyView(false);
        setCurrentPlanet(newPlanet);
      }
    }
  };

  // Double click
  const onDoubleClick = (event: MouseEvent) => {
    // Pointer is based on canvas size
    pointer.x = (event.clientX / size.width) * 2 - 1;
    pointer.y = -(event.clientY / size.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let object = intersects[0].object;

      // Get root object
      while (object.parent && !object.userData.planetName) {
        object = object.parent;
      }

      let newPlanet = object.userData.planetName;
      const isPlanet = planetCheck(newPlanet);

      if (newPlanet && isPlanet) {
        setCurrentPlanet(object.userData.planetName);
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
