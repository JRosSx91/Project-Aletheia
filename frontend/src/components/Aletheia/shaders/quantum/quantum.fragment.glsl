uniform float uTime;
uniform float uBrightness; 
uniform float uGridScale;

varying vec2 vUv;

float getQuantumPattern(vec2 uv) {
    vec2 grid_uv = uv * uGridScale;
    vec2 d = fwidth(grid_uv);
    vec2 grid = fract(grid_uv);
    vec2 a = smoothstep(vec2(0.0), d * 1.5, grid);
    vec2 b = smoothstep(vec2(0.0), d * 1.5, 1.0 - grid);
    return 1.0 - (a.x * a.y * b.x * b.y);
}

void main() {
    vec2 uv = vUv;
    uv.x += uTime * 0.2;

    float lines = getQuantumPattern(uv);

    vec3 color = vec3(0.5, 0.8, 1.0) * lines;
    float alpha = pow(lines, 2.0) * uBrightness;

    gl_FragColor = vec4(color, alpha);
}
