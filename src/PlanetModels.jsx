import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";

const Sun = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/sun.glb");
  const planetRef = useRef();

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "sun";
    }
  }, [gltf]);

  // Add rotation
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x += 0.0002;
      planetRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={planetRef}
      scale={[100, 100, 100]}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Mercury = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/mercury.glb");
  const planetRef = useRef();

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "mercury";
    }
  }, [gltf]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x += 0.0002;
      planetRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={planetRef}
      scale={[1, 1, 1]}
      position={[2800, 0, 0]}
      rotation={[20, Math.PI, 0]}
    />
  );
};

const Earth = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/earth.glb");
  const planetRef = useRef();

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "earth";
    }
  }, [gltf]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x += 0.0002;
      planetRef.current.rotation.y += 0.0002;
      planetRef.current.userData.planetName = "earth";
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={planetRef}
      scale={[1, 1, 1]}
      position={[5200, 0, 0]}
      rotation={[20, Math.PI, 0]}
    />
  );
};

const Planets = () => {
  return (
    <>
      <Sun />
      <Mercury />
      <Earth />
    </>
  );
};

export default Planets;
