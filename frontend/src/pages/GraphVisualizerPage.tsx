import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGraphData } from "../hooks/useGraphData";
import { animate, createScope, stagger } from "animejs";
import { ThreeScene } from "../components/Scene";

export function GraphVisualizerPage() {
  const { t } = useTranslation();
  const { data, loading, error } = useGraphData();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (data && data.nodes.length > 0 && listRef.current) {
      const scope = createScope({ root: listRef.current }).add(() => {
        animate(".node-item", {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(75),
          duration: 800,
          easing: "easeOutExpo",
        });
      });

      return () => scope.revert();
    }
  }, [data]);

  if (loading) {
    return <div>{t("loadingMessage")}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* La Escena 3D actuará como fondo */}
      <ThreeScene />

      {/* Contenedor para la UI, superpuesto sobre el canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Permite hacer clic "a través" de este div
        color: 'white',
        padding: '2rem'
      }}>
        {/* Los elementos de la UI tendrán 'pointerEvents: auto' para ser clickables */}
        <h1 style={{ pointerEvents: 'auto' }}>Proyecto Aletheia</h1>
        <div style={{ position: 'absolute', bottom: '2rem', pointerEvents: 'auto' }}>
          {/* Aquí irá en el futuro el menú de conversación, etc. */}
          <button>Preguntar a Aletheia</button>
        </div>
      </div>
    </div>
  );
}
