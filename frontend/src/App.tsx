import { GraphVisualizerPage } from "./pages/GraphVisualizerPage";
import "./index.css";
import { extend } from "@react-three/fiber";
import { HolographicMaterial } from "./materials/HolographicMaterial";

extend({ HolographicMaterial });
function App() {
  return <GraphVisualizerPage />;
}

export default App;
