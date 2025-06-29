import { GraphVisualizerPage } from "./pages/GraphVisualizerPage";
import "./index.css";
import { extend } from "@react-three/fiber";
import { HolographicMaterial } from "./materials/HolographicMaterial";
import { ParticleGalaxyMaterial } from "./components/Aletheia/ParticlesGalaxy";
import { FractalEnergyMaterial } from "./components/Aletheia/EnergyContainer";

extend({ HolographicMaterial, ParticleGalaxyMaterial, FractalEnergyMaterial });
function App() {
  return <GraphVisualizerPage />;
}

export default App;
