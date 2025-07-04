import { forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";
import vertexShader from "./shaders/quantum/quantum.vertex.glsl";
import fragmentShader from "./shaders/quantum/quantum.fragment.glsl";

export const QuantumFieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmplitude: 1.0,
    uFrequency: 0.5,
    uGridScale: 50.0,
    uBrightness: 0.5,
    uGenesisAmplitude: 0.0,
    uGenesisWidth: 2.5,
  },
  vertexShader,
  fragmentShader
);

export const QuantumField = forwardRef<THREE.ShaderMaterial>((_props, ref) => {
  const { amplitude, frequency, gridScale, brightness } = useControls(
    "Campo Cuántico",
    {
      Deformación: folder({
        amplitude: { value: 1.0, min: 0, max: 5, label: "Amplitud Base" },
        frequency: { value: 0.5, min: 0.1, max: 2.0, label: "Frecuencia Base" },
      }),
      Red: folder({
        gridScale: { value: 400.0, min: 5.0, max: 600.0, label: "Escala" },
        brightness: { value: 0.5, min: 0.0, max: 1.0, label: "Brillo" },
      }),
    }
  );

  useFrame((state) => {
    if (ref && "current" in ref && ref.current) {
      ref.current.uniforms.uTime.value = state.clock.getElapsedTime();
      ref.current.uniforms.uAmplitude.value = amplitude;
      ref.current.uniforms.uFrequency.value = frequency;
      ref.current.uniforms.uGridScale.value = gridScale;
      ref.current.uniforms.uBrightness.value = brightness;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <quantumFieldMaterial
        ref={ref}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
});
QuantumField.displayName = "QuantumField";
