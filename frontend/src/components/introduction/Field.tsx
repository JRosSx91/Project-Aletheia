import * as THREE from "three";
import React from "react";

// Usamos forwardRef para poder pasar una ref desde el padre hasta el <mesh> interno.
export const Field = React.forwardRef<THREE.Mesh>((props, ref) => {
  return (
    <mesh ref={ref}>
      <planeGeometry args={[10, 10]} />
      {/* Hacemos el material transparente para poder animar su opacidad. 
          Iniciamos con opacidad 0. */}
      <meshBasicMaterial color="white" transparent opacity={0} />
    </mesh>
  );
});

// Añadimos un displayName para facilitar la depuración en las React DevTools.
Field.displayName = "Field";
