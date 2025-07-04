/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { MathUtils } from "three";
import { QuantumField } from "./QuantumField";
import { GenesisDrop } from "./GenesisDrop";

export function GenesisSequence() {
  const dropRef = useRef<THREE.Group>(null!);
  const fieldRef = useRef<THREE.ShaderMaterial>(null!);
  const dropMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  const { progress } = useControls("Secuencia de Génesis", {
    progress: { value: 0.0, min: 0.0, max: 1.0, label: "Progreso" },
  });

  const waveRiseEnd = 0.4;
  const detachEnd = 0.5;
  const formationEnd = 0.6;
  const ignitionEnd = 0.8;
  const compressionEnd = 1.0;

  const waveMaxAmplitude = 4.0;
  const suspendedY = waveMaxAmplitude + 2.5;

  useFrame((state) => {
    if (!fieldRef.current || !dropRef.current || !dropMaterialRef.current)
      return;

    const time = state.clock.getElapsedTime();
    const drop = dropRef.current;
    const material = dropMaterialRef.current as any;

    const waveRecedeProgress = Math.sin(
      Math.min(1.0, progress / detachEnd) * Math.PI
    );
    fieldRef.current.uniforms.uGenesisAmplitude.value =
      waveRecedeProgress * waveMaxAmplitude;

    drop.visible = progress > waveRiseEnd;
    const finalDropY =
      progress < waveRiseEnd
        ? waveRecedeProgress * waveMaxAmplitude + 2
        : suspendedY;
    drop.position.y = finalDropY;

    let displacement = 1.0,
      colorTransition = 0.0,
      textureTransition = 0.0,
      scale = 1.0,
      rotation = 0.0;

    if (progress > detachEnd && progress <= formationEnd) {
      const phaseProgress = (progress - detachEnd) / (formationEnd - detachEnd);
      displacement = MathUtils.lerp(1.0, 0.0, phaseProgress);
      rotation = phaseProgress * 10.0;
      colorTransition = phaseProgress;
    } else if (progress > formationEnd && progress <= ignitionEnd) {
      const phaseProgress =
        (progress - formationEnd) / (ignitionEnd - formationEnd);
      displacement = 0.0;
      rotation = 10.0;
      colorTransition = 1.0;
      textureTransition = phaseProgress;
    } else if (progress > ignitionEnd) {
      const phaseProgress =
        (progress - ignitionEnd) / (compressionEnd - ignitionEnd);
      displacement = 0.0;
      rotation = 10.0 + phaseProgress * 20.0;
      textureTransition = 1.0;
      scale = MathUtils.lerp(1.0, 0.1, phaseProgress);
      material.uniforms.uColorTransition.value = 1.0;
    }

    drop.scale.set(scale, scale, scale);
    drop.rotation.y += rotation * 0.01;

    material.uniforms.uTime.value = time;
    material.uniforms.uDisplacementAmount.value = displacement;
    material.uniforms.uColorTransition.value = colorTransition;
    material.uniforms.uTextureTransition.value = textureTransition;
  });

  return (
    <group>
      <QuantumField ref={fieldRef} />
      <group ref={dropRef} position={[0, 2, 0]} visible={false}>
        <GenesisDrop ref={dropMaterialRef} />
      </group>
    </group>
  );
}
