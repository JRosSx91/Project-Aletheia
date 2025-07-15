import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GenesisSequence } from "./GenesisSequence";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { AletheiaAvatar } from "./AletheiaAvatar";

export function AletheiaScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
      <color args={["#010101"]} attach="background" />
      <GenesisSequence />
      <OrbitControls />
      <EffectComposer>
        <Bloom
          intensity={1.25} // Intensidad del brillo
          luminanceThreshold={0.75} // Solo los objetos más brillantes que este umbral brillarán
          luminanceSmoothing={0.8} // Suaviza la transición del brillo
          mipmapBlur // Mejora la calidad del desenfoque
        />
      </EffectComposer>
    </Canvas>
  );
}
