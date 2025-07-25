import "./index.css";
import { extend } from "@react-three/fiber";
import { HolographicMaterial } from "./materials/HolographicMaterial";
import { ParticleGalaxyMaterial } from "./components/Aletheia/ParticlesGalaxy";
import { FractalEnergyMaterial } from "./components/Aletheia/EnergyContainer";
import { QuantumFieldMaterial } from "./components/Aletheia/QuantumField";
import { MetamorphosisMaterial } from "./components/Aletheia/materials/MetamorphosisMaterial";
import { IntroductionPage } from "./pages/IntroductionPage";

extend({
  HolographicMaterial,
  ParticleGalaxyMaterial,
  FractalEnergyMaterial,
  QuantumFieldMaterial,
  MetamorphosisMaterial,
});
function App() {
  return <IntroductionPage />;
}

export default App;
