// src/components/PostProcessingEffects.tsx
import {
  Bloom,
  EffectComposer,
  HueSaturation,
  TiltShift2,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
export default function PostProcessingEffects() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* El TiltShift crea un desenfoque sutil en los bordes de la pantalla */}
      <TiltShift2 blur={0.1} />
      {/* Usan dos pasadas de Bloom con diferentes configuraciones para un resplandor más rico */}
      <Bloom luminanceThreshold={0.35} mipmapBlur radius={0.4} intensity={1} />
      <Bloom luminanceThreshold={0.1} mipmapBlur radius={0.5} intensity={0.6} />
      <Vignette darkness={0.55} blendFunction={BlendFunction.NORMAL} />
      <HueSaturation
        hue={0.2}
        saturation={0.1}
        blendFunction={BlendFunction.NORMAL} // 3. Añadimos el modo de mezcla
      />
    </EffectComposer>
  );
}
