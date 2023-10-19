varying vec2 vUv;

uniform float uTime;
uniform float uWiggleIntensity;
uniform float uZoom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.x += (sin(modelPosition.y * 10.0 + (uTime * 0.5)) * sin(modelPosition.y * 50.0 + (uTime * 0.1))) * uWiggleIntensity;
    modelPosition.y += sin(modelPosition.x * 20.0 + (uTime * 0.3)) * uWiggleIntensity;
    modelPosition.z += uZoom;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}