THREE.CloudsShader = {

    uniforms: {

        "tDiffuse": { type: "t", value: null },
        "opacity":  { type: "f", value: 1.0 }

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main()",
        "{",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform sampler2D map;",

        "uniform vec3 fogColor;",
        "uniform float fogNear;",
        "uniform float fogFar;",

        "varying vec2 vUv;",

        "void main() {",

        "    float depth = gl_FragCoord.z / gl_FragCoord.w;",
        "    float fogFactor = smoothstep( fogNear, fogFar, depth );",

        "    gl_FragColor = texture2D( map, vUv );",
        "    gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );",
        "   gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

        "}"

    ].join("\n")

};
