THREE.VerticalBlurShader = {

    uniforms: {

        "tDiffuse": { type: "t", value: null },
        "h":        { type: "f", value: 1.0 / 512.0 },
        "bluredArea":        { type: "f", value: 0.21 }

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform sampler2D tDiffuse;",
        "uniform float h;",
        "uniform float bluredArea;",
        "varying vec2 vUv;",

        "void main() {",

        "vec4 sum = vec4( 0.0 );",

        "float vv = h * (vUv.y*vUv.y - vUv.y + bluredArea );",
        "float vx = h * (vUv.x*vUv.x - vUv.x + bluredArea );",
        "if(vx > vv){ vv = vx;}",
        "if(vv<0.0)",
        "{",
        "vv = 0.0;",
        "}",

        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;",

        "gl_FragColor = sum;",

        "}"

    ].join("\n")

};
