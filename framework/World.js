
sly.World = function()
{
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.objects = [];
    this.rootObjects = new THREE.Object3D();
}

sly.World.prototype.init = function(container)
{
    var container = document.getElementById(container);

    //this.stats = new Stats();
    //this.stats.domElement.style.position = 'absolute';
    //this.stats.domElement.style.top = '0px';
    //container.appendChild( this.stats.domElement );

    var renderer = this.rendererInit(container, container.offsetWidth, container.offsetHeight);

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x040B21,3000, 8000 );
    scene.add(this.rootObjects);

    var camera = new sly.Camera();
    camera.init(container.offsetWidth, container.offsetHeight);
    this.addObject(camera);

    this.renderer = renderer;
    this.scene = scene;
    this.backgroundScene = scene;
    this.camera = camera;
    this.container = container;

    this.resizable();
    this.postProcessing();

    this.run(renderer);
}

sly.World.prototype.run = function()
{
    this.update();

    this.composer.render();


    var that = this;
    window.requestAnimationFrame(function(){that.run()},1);
}

sly.World.prototype.update = function()
{
    var i, len;
    len = this.objects.length;
    for(i = 0; i < len; i++){
        this.objects[i].update();
    }

    //this.stats.update();
}

sly.World.prototype.addObject = function(object, scenet)
{
    this.objects.push(object);

    if(object.physicalBody)
    {

            this.rootObjects.add(object.physicalBody);
    }
}

sly.World.prototype.rendererInit = function(container, width, height)
{
    var renderer = new THREE.WebGLRenderer( {antialias:true} );
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);
    return renderer;
}

sly.World.prototype.resize = function()
{
    var SCREEN_WIDTH = this.container.offsetWidth;
    var SCREEN_HEIGHT = this.container.offsetHeight;

    this.camera.body.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    this.camera.body.updateProjectionMatrix();

    this.renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    this.postProcessing();

}

sly.World.prototype.resizable = function()
{
    var classReference = this;
    jQuery(window).resize(function() {
        classReference.resize();
    });
}

sly.World.prototype.postProcessing = function()
{

    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var rtParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: true };
    var renderTarget = new THREE.WebGLRenderTarget( SCREEN_WIDTH, SCREEN_HEIGHT, rtParameters );

    var composer = new THREE.EffectComposer( this.renderer,  renderTarget );
    composer.addPass( new THREE.RenderPass( this.scene, this.camera.body ) );


    var hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
    hblur.uniforms[ 'h' ].value = 100 / SCREEN_WIDTH ;
    hblur.uniforms[ 'bluredArea' ].value = 0.10;
    //hblur.renderToScreen = true;
    composer.addPass( hblur );

    var vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );
    vblur.uniforms[ 'h' ].value = 100 / SCREEN_HEIGHT ;
    vblur.uniforms[ 'bluredArea' ].value = 0.10;
    vblur.renderToScreen = true;
    composer.addPass( vblur );

    this.composer = composer;
}