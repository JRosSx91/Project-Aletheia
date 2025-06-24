// src/components/HolographicMaterial.tsx
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  AdditiveBlending,
  NormalBlending,
  FrontSide,
  BackSide,
  DoubleSide,
  ShaderMaterial,
} from "three";
import type { ReactNode } from "react";

// --- Props del Material con Tipos ---
export interface HolographicMaterialProps {
  fresnelAmount?: number;
  fresnelOpacity?: number;
  scanlineSize?: number;
  hologramBrightness?: number;
  signalSpeed?: number;
  hologramColor?: string;
  enableBlinking?: boolean;
  blinkFresnelOnly?: boolean;
  enableAdditive?: boolean;
  hologramOpacity?: number;
  side?: "FrontSide" | "BackSide" | "DoubleSide";
  children?: ReactNode;
}

// --- Definición del ShaderMaterial con Tipos ---
export const HolographicShaderMaterial = shaderMaterial(
  {
    time: 0,
    fresnelOpacity: 1.0,
    fresnelAmount: 0.45,
    scanlineSize: 8.0,
    hologramBrightness: 1.2,
    signalSpeed: 0.45,
    hologramColor: new Color("#51a4de"),
    enableBlinking: true,
    blinkFresnelOnly: true,
    hologramOpacity: 1.0,
  },
  // Vertex Shader (integrado)
  /*GLSL*/ `
    varying vec2 vUv;
    varying vec3 vPositionW;
    varying vec4 vPos;
    varying vec3 vNormalW;
    void main() {
      vUv = uv;
      vPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vPositionW = vec3(modelMatrix * vec4(position, 1.0));
      vNormalW = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  // Fragment Shader (integrado)
  /*GLSL*/ `
    varying vec2 vUv;
    varying vec3 vPositionW;
    varying vec4 vPos;
    varying vec3 vNormalW;
    
    uniform float time;
    uniform float fresnelOpacity;
    uniform float scanlineSize;
    uniform float fresnelAmount;
    uniform float signalSpeed;
    uniform float hologramBrightness;
    uniform float hologramOpacity;
    uniform bool blinkFresnelOnly;
    uniform bool enableBlinking;
    uniform vec3 hologramColor;

    float flicker(float amt, float time) { return clamp(fract(cos(time) * 43758.5453123), amt, 1.0); }
    
    void main() {
      vec2 vCoords = vPos.xy / vPos.w * 0.5 + 0.5;
      vec2 myUV = fract(vCoords);
      
      vec4 holoColor = vec4(hologramColor, hologramOpacity);
      
      // Scanlines
      float scanlines = 10.0 * sin(time * signalSpeed * 5.0 - myUV.y * 20.0 * scanlineSize);
      scanlines *= smoothstep(1.3 * cos(time * signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);
      scanlines *= max(0.25, sin(time * signalSpeed) * 1.0);
      
      holoColor += vec4(scanlines, scanlines, scanlines, 1.0) * 0.1;
      
      // Fresnel
      vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
      float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity / 2.0);
      fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0.0, fresnelOpacity);
      
      // Blinking
      float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;
      float blink = flicker(blinkValue, time * signalSpeed * 0.1);
      
      vec3 finalColor;
      if (blinkFresnelOnly) {
        finalColor = holoColor.rgb + fresnelEffect * blink;
      } else {
        finalColor = holoColor.rgb * blink + fresnelEffect;
      }
      
      gl_FragColor = vec4(finalColor * hologramBrightness, hologramOpacity);
    }`
);

export default function HolographicMaterial(props: HolographicMaterialProps) {
  const ref = useRef<ShaderMaterial>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.uniforms.time.value += delta;
    }
  });

  const sideMap = {
    FrontSide: FrontSide,
    BackSide: BackSide,
    DoubleSide: DoubleSide,
  };

  return (
    <holographicMaterial
      key={HolographicShaderMaterial.key}
      side={sideMap[props.side || "FrontSide"]}
      transparent={true}
      blending={props.enableAdditive ? AdditiveBlending : NormalBlending}
      ref={ref}
      {...props}
    />
  );
}
