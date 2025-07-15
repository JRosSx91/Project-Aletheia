import vertexShader from "../shaders/genesis-drop/genesis-drop.vertex.glsl";
import fragmentShader from "../shaders/genesis-drop/genesis-drop.fragment.glsl";
import { shaderMaterial } from "@react-three/drei";

export const MetamorphosisMaterial = shaderMaterial(
  {
    // Uniforms que la animación necesita para funcionar.
    // Los he restaurado todos para evitar más errores.
    uTime: 0,
    uDisplacementAmount: 1.0,
    uOpacity: 1.0, // <-- EL UNIFORM QUE FALTABA Y CAUSABA EL ERROR

    // Dejamos los uniforms del shader de fuego, aunque no los usemos todos ahora.
    uTransitionProgress: 0.0,
    uColorTransition: 0.0,
    uAlphaMap: null,
    uEmissiveIntensity: 0.0,
  },
  vertexShader,
  fragmentShader
);
