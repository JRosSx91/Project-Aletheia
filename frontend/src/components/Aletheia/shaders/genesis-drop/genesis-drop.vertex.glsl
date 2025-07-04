uniform float uTime;
uniform float uDisplacementAmount;

varying vec2 vUv;

#include "../../../../lygia/generative/snoise.glsl";

void main() {
    vUv = uv;
    vec3 pos = position;

    float displacement = snoise(pos * 5.0 + uTime * 0.5);
    pos += normal * displacement * uDisplacementAmount * 0.2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}