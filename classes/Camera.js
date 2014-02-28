
sly.Camera = function()
{
    this.previousPosition = null;
}

sly.Camera.prototype = new sly.BaseObject();

sly.Camera.prototype.init = function(width, height)
{
    var camera = new THREE.PerspectiveCamera(45, width / height, 60, 8000);
    camera.position.set(0,100,2400);
    this.body = camera;
}

sly.Camera.prototype.update = function()
{
    this.previousPosition = this.body.position.z;

    if(typeof this.attachedTarget!="undefined")
    {
        this.body.position.z = this.attachedTarget.physicalBody.position.z + 2600;
        this.body.rotation.y = -this.attachedTarget.physicalBody.position.x/3200;
        //this.body.lookAt(this.attachedTarget.physicalBody.position);
    }
}

sly.Camera.prototype.attachTo = function(target)
{
    this.attachedTarget = target;
}

sly.Camera.prototype.getDirection = function()
{
    var currentPosition = this.body.position.z;
    var previousPosition = this.previousPosition;

    if(currentPosition > previousPosition)
    {
        return 1;
    }
    else if(currentPosition < previousPosition)
    {
        return -1;
    }
    return 0;
}

