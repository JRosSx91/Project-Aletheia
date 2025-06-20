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
      console.log("Datos y DOM listos. Creando ámbito y animando...");

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
    <div style={{ padding: "2rem" }}>
      <h1>Proyecto Aletheia</h1>
      <div style={{ marginBottom: "2rem" }}>
        <ThreeScene />
      </div>

      <h2>{t("knowledgeNodesTitle")}</h2>
      <ul ref={listRef}>
        {data?.nodes.map((node) => (
          <li key={node.id} className="node-item" style={{ opacity: 0 }}>
            {node.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
