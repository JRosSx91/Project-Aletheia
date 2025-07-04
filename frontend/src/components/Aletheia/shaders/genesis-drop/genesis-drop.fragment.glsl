uniform float uTime;
uniform float uColorTransition;
uniform float uTextureTransition;
uniform sampler2D uFireAlphaMap; 

varying vec2 vUv;

#include "../../../../lygia/generative/fbm.glsl";

float getQuantumPattern(vec2 uv) {
    vec2 grid_uv = uv * 25.0;
    vec2 d = fwidth(grid_uv);
    vec2 grid = fract(grid_uv);
    vec2 a = smoothstep(vec2(0.0), d, grid);
    vec2 b = smoothstep(vec2(0.0), d, 1.0 - grid);
    return 1.0 - (a.x * a.y * b.x * b.y);
}

void main() {
    float quantumPattern = getQuantumPattern(vUv);

    float firePattern = fbm(vec3(vUv * 4.0, uTime * 0.5));
    firePattern = smoothstep(0.5, 0.55, (firePattern + 1.0) * 0.5);

    float finalAlpha = mix(quantumPattern, 1.0, uTextureTransition);
    
    float finalPattern = mix(quantumPattern, firePattern, uTextureTransition);

    vec3 colorRojo = vec3(1.0, 0.2, 0.0);
    vec3 colorAmarillo = vec3(1.0, 0.7, 0.2);
    vec3 colorAzul = vec3(0.6, 0.8, 1.0);
    
    vec3 tempColor = mix(colorRojo, colorAmarillo, smoothstep(0.0, 0.7, uColorTransition));
    vec3 finalColor = mix(tempColor, colorAzul, smoothstep(0.7, 1.0, uColorTransition));

    finalColor = mix(vec3(0.5, 0.8, 1.0), finalColor, uColorTransition);
    
    gl_FragColor = vec4(finalColor * finalPattern, finalAlpha);
}

