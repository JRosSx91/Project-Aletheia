// En: src/components/Aletheia/QuantumField.tsx - ACTUALIZADO

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";

import vertexShader from "./shaders/quantum/quantum.vertex.glsl?raw";
import fragmentShader from "./shaders/quantum/quantum.fragment.glsl?raw";

export const QuantumFieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmplitude: 1.0,
    uFrequency: 0.5,
    uGridScale: 50.0, // Añadimos el nuevo uniform con un valor inicial alto
    uBrightness: 0.5,
  },
  vertexShader,
  fragmentShader
);

export function QuantumField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { amplitude, frequency, gridScale } = useControls("Campo Cuántico", {
    Deformación: folder({
      amplitude: { value: 1.0, min: 0, max: 5, label: "Amplitud de Onda" },
      frequency: {
        value: 0.5,
        min: 0.1,
        max: 2.0,
        label: "Frecuencia de Onda",
      },
    }),
    Red: folder({
      // Nuevo grupo de controles para la rejilla
      gridScale: {
        value: 50.0,
        min: 5.0,
        max: 200.0,
        label: "Escala de la Red",
      },
      brightness: { value: 0.5, min: 0.0, max: 1.0, label: "Brillo" },
    }),
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uAmplitude.value = amplitude;
      materialRef.current.uniforms.uFrequency.value = frequency;
      materialRef.current.uniforms.uGridScale.value = gridScale; // Pasamos el nuevo valor
      materialRef.current.uniforms.uBrightness.value = 0.5; // Puedes ajustar este valor según sea necesario
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <quantumFieldMaterial
        ref={materialRef}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
