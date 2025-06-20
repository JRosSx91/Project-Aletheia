import { useTranslation } from "react-i18next";
import { useGraphData } from "../hooks/useGraphData";

export function GraphVisualizerPage() {
  const { t } = useTranslation();
  const { data, loading, error } = useGraphData();

  if (loading) {
    return <div>{t("loadingMessage")}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Proyecto Aletheia</h1>
      <h2>{t("knowledgeNodesTitle")}</h2>
      <ul>
        {data?.nodes.map((node) => (
          <li key={node.id}>{node.title}</li>
        ))}
      </ul>
    </div>
  );
}
