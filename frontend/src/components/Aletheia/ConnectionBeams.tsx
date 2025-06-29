// src/components/Aletheia/ConnectionBeams.tsx - VERSIÓN FINAL Y DEFINITIVA

import { useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
import { LightningStorm } from "../../lib/three/LightningStorm.js";

export function ConnectionBeams({ radius = 1.5 }) {
  // 2. Parámetros de la tormenta y de los rayos, expuestos a Leva
  const stormControls = useControls("Tormenta de Rayos", {
    Apariencia: folder({
      roughness: { value: 0.9, min: 0, max: 1, label: "Aspereza" },
      straightness: { value: 0.8, min: 0, max: 1, label: "Rectitud" },
    }),
    Frecuencia: folder({
      maxLightnings: {
        value: 8,
        min: 1,
        max: 20,
        step: 1,
        label: "Máx. Rayos",
      },
      lightningMinPeriod: {
        value: 0.1,
        min: 0.01,
        max: 5,
        label: "Periodo Mín.",
      },
      lightningMaxPeriod: {
        value: 0.5,
        min: 0.01,
        max: 10,
        label: "Periodo Máx.",
      },
    }),
    Duracion: folder({
      lightningMinDuration: {
        value: 0.2,
        min: 0.1,
        max: 5,
        label: "Duración Mín.",
      },
      lightningMaxDuration: {
        value: 0.5,
        min: 0.1,
        max: 10,
        label: "Duración Máx.",
      },
    }),
  });

  // 3. Creamos una única instancia de la tormenta
  const storm = useMemo(() => {
    return new LightningStorm({
      ...stormControls,
      lightningParameters: {
        ...stormControls,
        radius0: 0.05, // Radio del rayo en su origen
        radius1: 0.05, // Radio del rayo en su destino
      },
      lightningMaterial: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
      }),

      // 4. ESTA ES LA LÓGICA CLAVE: Definimos el origen y destino de cada rayo.
      onRayPosition: (source, dest) => {
        // El origen es siempre la singularidad central
        source.set(0, 0, 0);

        // El destino es un punto aleatorio en la superficie de la esfera contenedora
        dest
          .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize()
          .multiplyScalar(radius);
      },
    });
  }, [radius, stormControls]);

  // 5. En cada fotograma, actualizamos la tormenta
  useFrame((state) => {
    storm.update(state.clock.elapsedTime);
  });

  // 6. Renderizamos el objeto storm directamente en la escena
  return <primitive object={storm} />;
}
