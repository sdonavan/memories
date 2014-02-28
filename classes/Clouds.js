sly.Clouds = function()
{
    this.init();

    this.animator = new sly.CloudsAnimator();
    this.animator.init(this);
}

sly.Clouds.prototype = new sly.BaseObject();

sly.Clouds.prototype.init = function()
{
    geometry = new THREE.Geometry();

    var texture = THREE.ImageUtils.loadTexture( "models/textures/cloud.png", null);
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    var fog = new THREE.Fog(0x19448A,2000,6000);

    var material = new THREE.ShaderMaterial( {

        uniforms: {

            "map": { type: "t", value: texture },
            "fogColor" : { type: "c", value: fog.color },
            "fogNear" : { type: "f", value: fog.near },
            "fogFar" : { type: "f", value: fog.far }

        },
        vertexShader: THREE.CloudsShader.vertexShader,
        fragmentShader: THREE.CloudsShader.fragmentShader,
        depthWrite: false,
        depthTest: true,
        transparent: true

    } );

    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

    for ( var i = 0; i < 1500; i++ ) {

        plane.position.x = Math.random() * 1000 - 500;
        plane.position.y = - Math.random() * Math.random() * 200 - 15;
        plane.position.z = i;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

        THREE.GeometryUtils.merge( geometry, plane );

    }

    mesh = new THREE.Mesh( geometry, material );

    mesh.scale.y = 12;
    mesh.scale.x = 14;
    mesh.scale.z = 12;
    mesh.position.y = -50;
    mesh.doubleSided = false;
    this.physicalBody = mesh;
}

sly.Clouds.prototype.update = function()
{
    this.animator.wind();
}