varying vec3 vPosition;
varying vec3 vNormal; // <-- Esta línea envía el dato

void main() {
  vPosition = position;
  vNormal = normalize(normalMatrix * normal); // <-- Esta línea calcula el dato
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
