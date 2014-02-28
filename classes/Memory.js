sly.Memory = function(picture, width, height)
{
    this.init(picture, width, height);
}

sly.Memory.prototype = new sly.BaseObject();

sly.Memory.prototype.init = function(picture, width, height)
{
    this.physicalBody = new THREE.Object3D();
    this.initImage(picture, width, height);
    //this.initTitle("May 24 2012",720*2,480*2);
    this.spawn();
}

sly.Memory.prototype.initImage = function(picture,width,height)
{
    var classReference = this;

    var texture = picture;

    var plane = new THREE.PlaneGeometry(width, height);

    var material1 = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide, opacity: 0.5, blending: 2 } );
    material1.transparent = true;
    material1.needsUpdate = true;

    var mesh1 = new THREE.Mesh(
        plane,
        material1
    );
    mesh1.position.set(0,0,0);
    //mesh1.visible = false;
    classReference.physicalBody.add(mesh1);
}

sly.Memory.prototype.initTitle = function(text, widh, height)
{
    // create a canvas element
    var canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = widh;

    var context = canvas.getContext('2d');
    context.font = "bold 60px Trebuchet MS";
    context.fillStyle = "rgba(255,255,255,1)";
    context.fillText(text, 0, 120);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var material1 = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide,opacity:0.9 } );
    material1.transparent = true;

    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas.width, canvas.height),
        material1
    );
    mesh1.position.set(20, 160, -2);

    this.physicalBody.add(mesh1);
}

sly.Memory.prototype.spawn = function()
{
    var randomNum = this.getRandomInt(800,1400);
    var side = this.getRandomInt(1,2);
    if(side == 2)
        side = -1;
    this.physicalBody.position.y = 300;
    this.physicalBody.position.x = randomNum*side;
}

sly.Memory.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}