// src/components/Scene.tsx

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";

function Box() {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

// --- Componente principal de la Escena 3D ---
export function ThreeScene() {
  return (
    // Canvas es el componente principal de R3F. Crea el escenario.
    <Canvas style={{ height: "400px", width: "100%", background: "#202020" }}>
      {/* Añadimos una luz ambiental para que todo se ilumine un poco */}
      <ambientLight intensity={0.5} />
      {/* Añadimos una luz puntual, como una bombilla, para crear sombras */}
      <pointLight position={[10, 10, 10]} />

      {/* Renderizamos nuestro componente del cubo */}
      <Box />

      {/* OrbitControls es un componente de Drei que nos da controles de cámara (zoom, rotar, mover) con el ratón */}
      <OrbitControls />
    </Canvas>
  );
}
