import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Scene = () => {
  return (
    <Canvas>
      {/* Basic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* 3D Objects */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
