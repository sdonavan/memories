sly.EveBody = function()
{
    this.physicalBody = new THREE.Object3D();
    this.init({url: "models/body.js"});
}

sly.EveBody.prototype = new sly.ModelObject();


sly.EveHand = function()
{
    this.physicalBody = new THREE.Object3D();
    this.init({url: "models/hand.js"});
}

sly.EveHand.prototype = new sly.ModelObject();


sly.EveHead = function()
{
    this.physicalBody = new THREE.Object3D();
    this.init({url: "models/head.js", textured: true});
}

sly.EveHead.prototype = new sly.ModelObject();

sly.Eve = function()
{

    var classReferance = this;

    this.head = this.children[0];

    this.body = this.children[1];

    this.leftArm = this.children[2];
    this.leftArm.physicalBody.position.set(230,0,0);

    this.rightArm = this.children[3];

    this.physicalBody.position.set(0,0,-400);
    this.physicalBody.rotation.set(0.2,0,0);
    this.initAnimator();
}

sly.Eve.prototype = new sly.CompositeObject([new sly.EveHead(), new sly.EveBody(), new sly.EveHand(), new sly.EveHand()]);

sly.Eve.prototype.update = function()
{
    this.interface.update();
}

sly.Eve.prototype.initAnimator = function()
{
    this.Animator = new sly.EveAnimator();
    this.Animator.init(this);

    this.interface = new sly.EveInterface();
    this.interface.attach(this.Animator);
}

