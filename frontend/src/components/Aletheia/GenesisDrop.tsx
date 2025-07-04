import { forwardRef } from "react";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "./shaders/genesis-drop/genesis-drop.vertex.glsl";
import fragmentShader from "./shaders/genesis-drop/genesis-drop.fragment.glsl";

const MetamorphosisMaterial = shaderMaterial(
  {
    uTime: 0,
    uDisplacementAmount: 1.0,
    uColorTransition: 0.0,
    uTextureTransition: 0.0,
    uColor: new THREE.Color("white"),
  },
  vertexShader,
  fragmentShader
);

extend({ MetamorphosisMaterial });

export const GenesisDrop = forwardRef<THREE.ShaderMaterial>((_props, ref) => {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 64, 64]} />
      <metamorphosisMaterial
        ref={ref}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
});

GenesisDrop.displayName = "GenesisDrop";
