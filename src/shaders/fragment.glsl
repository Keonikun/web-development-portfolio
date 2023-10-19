varying vec2 vUv;

uniform sampler2D uMap;
uniform float uTime;

void main()
{
    vec4 morphingTexture = texture2D(uMap, vec2( vUv.x + (uTime * 0.1), vUv.y + (uTime * 0.05) ));

    gl_FragColor = morphingTexture;
}