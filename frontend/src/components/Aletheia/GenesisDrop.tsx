// src/components/Aletheia/GenesisDrop.tsx

import { forwardRef } from "react";
import * as THREE from "three";
import "./materials/MetamorphosisMaterial"; // Se importa para que el 'extend' se registre

interface GenesisDropProps {
  metamorphosisMaterial: THREE.ShaderMaterial;
  fireballMaterial: THREE.MeshStandardMaterial;
  children?: React.ReactNode;
}

export const GenesisDrop = forwardRef<THREE.Group, GenesisDropProps>(
  ({ metamorphosisMaterial, fireballMaterial, children }, ref) => {
    return (
      <group ref={ref}>
        <mesh material={metamorphosisMaterial}>
          <sphereGeometry args={[0.4, 64, 64]} />
        </mesh>
        <mesh material={fireballMaterial}>
          <sphereGeometry args={[0.4, 64, 64]} />
        </mesh>
        {children}
      </group>
    );
  }
);

GenesisDrop.displayName = "GenesisDrop";
