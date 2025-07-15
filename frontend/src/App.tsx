import { GraphVisualizerPage } from "./pages/GraphVisualizerPage";
import "./index.css";
import { extend } from "@react-three/fiber";
import { HolographicMaterial } from "./materials/HolographicMaterial";
import { ParticleGalaxyMaterial } from "./components/Aletheia/ParticlesGalaxy";
import { FractalEnergyMaterial } from "./components/Aletheia/EnergyContainer";
import { QuantumFieldMaterial } from "./components/Aletheia/QuantumField";
import { MetamorphosisMaterial } from "./components/Aletheia/materials/MetamorphosisMaterial";

extend({
  HolographicMaterial,
  ParticleGalaxyMaterial,
  FractalEnergyMaterial,
  QuantumFieldMaterial,
  MetamorphosisMaterial,
});
function App() {
  return <GraphVisualizerPage />;
}

export default App;
