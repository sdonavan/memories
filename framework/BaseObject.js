sly.BaseObject = function()
{
    this.physicalBody = new THREE.Object3D();
}

sly.BaseObject.prototype = new sly.BaseObject();

sly.BaseObject.prototype.update = function()
{

}
