import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";

const scalingFactor = 10000;

const Sun = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/sun.glb");
  const planetRef = useRef();

  // Assign userdata for raycast logic
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "sun";
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
      scale={[100, 100, 100]}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Mercury = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/mercury.glb");
  const planetRef = useRef();

  // Assign userdata for raycast logic
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
      position={[0.39 * scalingFactor, 0, 0]}
      rotation={[20, Math.PI, 0]}
    />
  );
};

const Venus = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/venus.glb");
  const planetRef = useRef();

  // Assign userdata for raycast logic
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "venus";
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
      position={[0.72 * scalingFactor, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Earth = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/earth.glb");
  const planetRef = useRef();

  // Assign userdata for raycast logic
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "earth";
    }
  }, [gltf]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={planetRef}
      scale={[1, 1, 1]}
      position={[1 * scalingFactor, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Mars = () => {
  const gltf = useLoader(GLTFLoader, "/3D-assets/mars.glb");
  const planetRef = useRef();

  // Assign userdata for raycast logic
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.userData.planetName = "mars";
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
      position={[1.52 * scalingFactor, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const PlanetModels = () => {
  return (
    <>
      <Sun />
      <Mercury />
      <Venus />
      <Earth />
      <Mars />
    </>
  );
};

export default PlanetModels;
