import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createTimeline } from "animejs";
import { useEffect, useRef } from "react";

// ACCIÓN: Derivamos el tipo del timeline directamente de la función 'createTimeline'.
// Esto garantiza que siempre tendremos el tipo correcto sin depender de exportaciones no públicas.
type Timeline = ReturnType<typeof createTimeline>;

interface SceneControllerProps {
  fieldRef: React.RefObject<THREE.Mesh>;
}

export const SceneController = ({ fieldRef }: SceneControllerProps) => {
  const scroll = useScroll();
  // El 'ref' ahora usa el tipo 'Timeline' que hemos derivado.
  const timeline = useRef<Timeline | null>(null);

  useEffect(() => {
    // Nos aseguramos de que la referencia al objeto exista antes de crear la animación
    if (!fieldRef.current) return;

    // ACCIÓN: Usamos 'createTimeline()' directamente.
    timeline.current = createTimeline({
      autoplay: false,
    });

    // Conectamos el timeline a los objetos reales.
    // KEYFRAME: Fade in del campo (15% - 40% del scroll)
    timeline.current.add(fieldRef.current.material, {
      opacity: 1,
      duration: 2500,
      easing: "linear",
    });

    // KEYFRAME: Fade out del campo (60% - 70% del scroll)
    timeline.current.add(fieldRef.current.material, {
      opacity: 0,
      duration: 1000,
      easing: "linear",
    });

    // ...Aquí irán las futuras animaciones para el shader y el ojo.
  }, [fieldRef]); // El efecto se re-ejecutará si la referencia cambia.

  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(timeline.current.duration * scroll.offset);
    }
  });

  return null;
};
