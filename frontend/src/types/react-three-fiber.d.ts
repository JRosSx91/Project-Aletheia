import type { ShaderMaterial } from "three";
import type { Object3DNode } from "@react-three/fiber";
import { HolographicMaterialProps } from "../components/HolographicMaterial";

declare module "@react-three/fiber" {
  interface ThreeElements {
    sidMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
    holographicMaterial: Object3DNode<
      ShaderMaterial & HolographicMaterialProps,
      typeof ShaderMaterial
    >;
  }
}
