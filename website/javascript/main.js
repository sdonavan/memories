jQuery("document").ready(function(){

    Loader = new sly.Loader();

    var app = new sly.World();
    app.init("container");

    var music = new sly.MusicEngine();
    music.init();

    var globalAnimator = new sly.Animator();

    var facebook = new FacebookEngine();
    facebook.init();

    var memories = new sly.MemoryEngine();
    memories.init(app.camera, globalAnimator);
    facebook.connectToInterface(memories);
    app.addObject(memories);

    var eventEngine = new sly.EventEngine();

    var eve = new sly.Eve();
    app.addObject(eve);
    app.camera.attachTo(eve);
    eventEngine.addSubscriber(eve.interface);

    var interface = new Interface();
    interface.init(facebook, eventEngine);
    music.addSubscriber(interface);

    var sun = new sly.BaseObject();

    var textureFlare0 = THREE.ImageUtils.loadTexture( "models/textures/sun.png" );
    var textureFlare2 = THREE.ImageUtils.loadTexture( "models/textures/lensflare2.png" );
    var textureFlare3 = THREE.ImageUtils.loadTexture( "models/textures/lensflare3.png" );

    var flareColor = new THREE.Color( 0xffffff );
    var lensFlare = new THREE.LensFlare( textureFlare0, 1400, 0.0, THREE.AdditiveBlending, flareColor );
    lensFlare.add( textureFlare3, 100, 0.3, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 120, 0.7, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 190, 0.9, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 100, 1.1, THREE.AdditiveBlending );
    lensFlare.position.y = 600;
    sun.physicalBody.add(lensFlare);
    sun.update = function(){
        this.physicalBody.position.z = app.camera.body.position.z;
        this.physicalBody.position.z-=220;
    }

    sun.physicalBody.position.y-=500;
    sun.physicalBody.position.x-=100;
    app.addObject(sun);



    var light5 = new sly.BaseObject();
    light5.physicalBody = new THREE.HemisphereLight(0xffffff,0.3);
    light5.physicalBody.position.y = -100;
    app.addObject(light5);

    var light3 = new sly.BaseObject();
    light3.physicalBody = new THREE.DirectionalLight(0xffffff,0.25);
    light3.physicalBody.position.set(0,1000,3000);
    app.addObject(light3);

    var t = new sly.TerrainEngine();
    t.init(new sly.Clouds(), new sly.Clouds(),new sly.Clouds(), app.camera.body);
    app.addObject(t);

});