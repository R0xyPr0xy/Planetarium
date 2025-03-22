import * as THREE from "three";
import { useEffect, useRef } from "react";
import { ThreeElements } from "@react-three/fiber";
import planetCatalogue from "../data/planetCatalogue.json";

const OrbitLines = () => {
  return (
    <>
      {Object.entries(planetCatalogue).map(([key, planet]) => {
        const radius = Math.abs(planet.position[0]);
        const segments = 64;

        const geometry = new THREE.CircleGeometry(radius, segments);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const circle = new THREE.LineLoop(edges, material);
        circle.rotation.x = Math.PI / 2;

        const circleRef = useRef<ThreeElements["primitive"] | null>(null);

        // Assign userdata for raycast logic
        useEffect(() => {
          if (circle) {
            circle.userData.planetName = key + "Orbit";
          }
        }, [circle]);

        return (
          <primitive
            key={key}
            object={circle}
            ref={circleRef}
            position={[0, 0, 0]}
          />
        );
      })}
    </>
  );
};

export default OrbitLines;
