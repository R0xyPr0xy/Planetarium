import * as THREE from "three";
import { useRef } from "react";

function createPathStrings(filename: string) {
  const basePath = "/Skybox-images/";
  const baseFilename = basePath + filename;
  const fileType = ".png";
  const sides = ["front", "back", "up", "down", "right", "left"];
  const pathStings = sides.map((side) => {
    return baseFilename + "_" + side + fileType;
  });

  return pathStings;
}

function createMaterialArray(filename: string) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    texture.anisotropy = 16; // Improve texture quality

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

const Skybox = () => {
  const skyboxImage = "skybox"; // Sourced from opengameart.org | Author: NoLogoGames
  const materialArray = createMaterialArray(skyboxImage);
  const skyboxGeo = new THREE.BoxGeometry(10000000, 10000000, 10000000);
  const skybox = new THREE.Mesh(skyboxGeo, materialArray);

  const skyRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <primitive object={skybox} ref={skyRef} position={[0, 0, 0]} />
    </>
  );
};

export default Skybox;
