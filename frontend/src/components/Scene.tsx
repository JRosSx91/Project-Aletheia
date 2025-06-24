// src/components/ThreeScene.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import PostProcessingEffects from "./PostProcessingEffects";
import { Sid } from "./Sid";

export function ThreeScene() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 35 }}>
      <color args={["#000510"]} attach="background" />
      <Environment preset="apartment" />
      <OrbitControls minDistance={6} maxDistance={35} />

      {/* Nuestro protagonista */}
      <Sid position={[0, -1, 0]} />

      <PostProcessingEffects />
    </Canvas>
  );
}
