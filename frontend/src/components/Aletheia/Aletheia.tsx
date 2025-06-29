import { ConnectionBeams } from "./ConnectionBeams"; // Reutilizamos este componente
import { EnergyContainer } from "./EnergyContainer";

// --- Componente para la Singularidad Central ---
function Singularity() {
  return (
    <mesh>
      {/* Una esfera muy pequeña en el centro */}
      <sphereGeometry args={[0.1, 32, 32]} />
      {/* Un material muy brillante y simple */}
      <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
    </mesh>
  );
}

// --- Componente Principal de Aletheia ---
export function Aletheia() {
  return (
    <group>
      <EnergyContainer />
      <Singularity />
      {/* Reutilizamos ConnectionBeams para los rayos internos.
        El radio debe ser el de la esfera contenedora (1.5)
        para que los rayos impacten en su superficie.
      */}
      <ConnectionBeams radius={1.5} />
    </group>
  );
}
