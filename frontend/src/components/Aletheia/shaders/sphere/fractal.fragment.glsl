// src/components/Aletheia/shaders/sphere/sphere.fragment.glsl

// --- Uniforms ---
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uCoreColor;
uniform float uCorePower;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpAmplitude;
uniform float uFbmFrequency;
uniform float uFbmAmplitude;
uniform int uFbmOctaves;

// --- Varyings ---
varying vec3 vPosition;
varying vec3 vNormal;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = uFbmAmplitude;
    float frequency = uFbmFrequency;
    
    // Sumamos 'uFbmOctaves' capas de ruido
    for (int i = 0; i < uFbmOctaves; i++) {
        total += snoise(p * frequency) * amplitude;
        frequency *= 2.0; // En cada octava, doblamos la frecuencia (más detalle)
        amplitude *= 0.5; // Y reducimos a la mitad la amplitud (menos influencia)
    }
    return total;
}

// --- Proyección Esférica ---
// Convierte una posición 3D en la esfera a coordenadas 2D (UV)
vec2 sphericalProjection(vec3 p) {
    float theta = atan(p.x, p.z);
    float phi = acos(p.y / length(p));
    return vec2(theta / 3.1415926535, phi / 3.1415926535);
}

vec3 screen(vec3 colorA, vec3 colorB) {
    return 1.0 - (1.0 - colorA) * (1.0 - colorB);
}

void main() {
    vec2 uv = sphericalProjection(normalize(vPosition));

    // 2. Aplicamos Deformación de Dominio (Turbulencia) a las coordenadas
    float warpNoise = fbm(uv * uWarpFrequency + uTime * 0.1);
    uv += warpNoise * uWarpAmplitude;
    
    // 3. Calculamos el ruido fractal final usando las coordenadas deformadas
    float fractalNoise = fbm(uv + uTime * 0.2);
    
    // 4. Creamos los filamentos nítidos a partir del ruido fractal
    // `abs()` crea filamentos tanto en las crestas como en los valles del ruido
    float tendrils = smoothstep(0.6, 0.61, fractalNoise);
    vec3 networkColor = uColor * tendrils * uStrength;

    // 5. Calculamos el núcleo brillante (sin cambios)
    vec3 viewDirection = normalize(-vPosition);
    float coreGlow = dot(vNormal, viewDirection);
    coreGlow = pow(coreGlow, uCorePower);
    vec3 coreColor = uCoreColor * coreGlow;

    // 6. Componemos la imagen final con el modo Screen
    vec3 finalColor = screen(networkColor, coreColor);
    float alpha = max(tendrils, coreGlow);

    gl_FragColor = vec4(finalColor, alpha);
}