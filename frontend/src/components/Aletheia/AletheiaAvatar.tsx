// src/components/Aletheia/AletheiaAvatar.tsx
import { Aletheia } from "./Aletheia";
import { ParticleGalaxy } from "./ParticlesGalaxy";

/**
 * El contenedor principal para la IA, unificando el núcleo
 * y la nebulosa de partículas en una sola entidad.
 */
export function AletheiaAvatar() {
  return (
    <group>
      <Aletheia />
      <ParticleGalaxy />
    </group>
  );
}
