import { useLoader, useFrame, ThreeElements } from "@react-three/fiber";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import planetCatalogue from "../data/planetCatalogue.json";
import { useRef, useEffect } from "react";

const PlanetLoader = () => {
  return (
    <>
      {Object.entries(planetCatalogue).map(([key, planet]) => {
        const gltf = useLoader(GLTFLoader, planet.modelPath);
        const planetRef = useRef<ThreeElements["primitive"] | null>(null);

        // Assign userdata for raycast logic
        useEffect(() => {
          if (gltf.scene) {
            gltf.scene.userData.planetName = key;
          }
        }, [gltf]);

        useFrame(() => {
          if (planetRef.current) {
            planetRef.current.rotation.y += 0.0002;
          }
        });

        return (
          <primitive
            key={key}
            object={gltf.scene}
            ref={planetRef}
            scale={planet.scale}
            position={planet.position}
            rotation={[0, Math.PI, 0]}
          />
        );
      })}
    </>
  );
};

export default PlanetLoader;
