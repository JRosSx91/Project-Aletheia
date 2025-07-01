import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AletheiaAvatar } from "./AletheiaAvatar";
import { QuantumField } from "./QuantumField";

export function AletheiaScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
      <color args={["#010101"]} attach="background" />
      <QuantumField />
      <group position={[0, 8, 0]}>
        {" "}
        {/* 👈 Elevamos el grupo 2 unidades en el eje Y */}
        <AletheiaAvatar />
      </group>
      <OrbitControls />
    </Canvas>
  );
}
