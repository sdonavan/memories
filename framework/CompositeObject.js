sly.CompositeObject = function(objects)
{
    this.children = new Array();
    this.physicalBody = new THREE.Object3D();

    if (typeof(objects) != 'undefined') {
        var length = objects.length;
        for(var i=0; i<length; i++)
        {
            this.addChild(objects[i]);
        }
    }
}

sly.CompositeObject.prototype = new sly.BaseObject();

sly.CompositeObject.prototype.update = function()
{
    this.updateChildren();
}

sly.CompositeObject.prototype.addChild = function(child)
{
    this.children.push(child);

// If this is a renderable object, add its object3D as a child of mine
    if (child.physicalBody)
    {
        this.physicalBody.add(child.physicalBody);
    }
}

sly.CompositeObject.prototype.updateChildren = function()
{
    var i, len;
    len = this.children.length;
    for (i = 0; i < len; i++)
    {
        this.children[i].update();
    }
}

