// En: src/components/Aletheia/shaders/quantum/quantum.fragment.glsl - ACTUALIZADO

uniform float uTime;
uniform float uBrightness; 
uniform float uGridScale; // Nuevo uniform para controlar la escala
varying vec2 vUv;

void main() {
    // Escalamos las coordenadas para crear una rejilla densa
    vec2 grid_uv = vUv * uGridScale;

    // Usamos fract() para obtener las coordenadas dentro de cada celda (de 0.0 a 1.0)
    vec2 grid = fract(grid_uv);

    // fwidth(grid_uv) nos da el cambio de la coordenada por píxel.
    // Lo usamos para crear un antialiasing y un grosor de línea constante.
    vec2 d = fwidth(grid_uv);
    vec2 a = smoothstep(vec2(0.0), d * 1.5, grid); // Borde izquierdo/inferior
    vec2 b = smoothstep(vec2(0.0), d * 1.5, 1.0 - grid); // Borde derecho/superior
    
    // El producto de a * b nos da un cuadrado relleno.
    // 1.0 menos eso nos da solo las líneas.
    float lines = 1.0 - (a.x * a.y * b.x * b.y);

    // El color de las líneas es un cian brillante
    vec3 color = vec3(0.5, 0.8, 1.0) * lines;
    
    // La opacidad depende de la intensidad de la línea, para un efecto de brillo
     float alpha = pow(lines, 2.0) * uBrightness;

    gl_FragColor = vec4(color, alpha);
}