sly.Animator = function()
{

}

sly.Animator.prototype = new sly.BaseObject();


sly.Animator.prototype.GLOBAL =
{
    timeSpeed: 1
}

sly.Animator.prototype.parent = sly.BaseObject.prototype;

sly.Animator.prototype.init = function(object)
{
    this.target = object.physicalBody;

    this.object = object;

    this.frames =
    {
        baseCordinates:
        {
            position:
            {
                x: this.target.position.x,
                y: this.target.position.y,
                z: this.target.position.z
            },
            rotation:
            {
                x: this.target.rotation.x,
                y: this.target.rotation.y,
                z: this.target.rotation.z
            }
        },

        activeFrame:
        {
            position: this.target.position,
            rotation: this.target.rotation
        },

        baseFrame:
        {
            position: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0}
        }
    }

    this.context =
    {
        // Creates a copy of the position objects
        offset:
        {
            position: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0}
        }
    }

}

sly.Animator.prototype.createChildrenAnimators = function()
{
    var i, len;
    len = this.target.children.length;
    for (i = 0; i < len; i++)
    {
        this.object.children[i].Animator = new sly.Animator();
        this.object.children[i].Animator.init(this.object.children[i]);
    }
}

sly.Animator.prototype.animate = function()
{
    this.frames.activeFrame.position.x = this.frames.baseCordinates.position.x + this.context.offset.position.x;
    this.frames.activeFrame.position.y = this.frames.baseCordinates.position.y + this.context.offset.position.y;
    this.frames.activeFrame.position.z = this.frames.baseCordinates.position.z + this.context.offset.position.z;

    this.frames.activeFrame.rotation.x = this.frames.baseCordinates.rotation.x + this.context.offset.rotation.x;
    this.frames.activeFrame.rotation.y = this.frames.baseCordinates.rotation.y + this.context.offset.rotation.y;
    this.frames.activeFrame.rotation.z = this.frames.baseCordinates.rotation.z + this.context.offset.rotation.z;
}

sly.Animator.prototype.move = function(offset,max)
{
    if(typeof offset.x!='undefined'){
        this.context.offset.position.x += offset.x*this.GLOBAL.timeSpeed;
        if(typeof max.x!='undefined')
        {
            if(this.context.offset.position.x > max.x)
            {
                this.context.offset.position.x = max.x;
            }
            if(this.context.offset.position.x < -max.x)
            {
                this.context.offset.position.x = -max.x;
            }
        }
    }
    if(typeof offset.y!='undefined'){
        this.context.offset.position.y += offset.y*this.GLOBAL.timeSpeed;
        if(typeof max.y!='undefined')
        {
            if(this.context.offset.position.y > max.y)
            {
                this.context.offset.position.y = max.y;
            }
            if(this.context.offset.position.y < -max.y)
            {
                this.context.offset.position.y = -max.y;
            }
        }
    }
    if(typeof offset.z!='undefined'){
        this.context.offset.position.z += offset.z*this.GLOBAL.timeSpeed;
        if(typeof max.z!='undefined')
        {
            if(this.context.offset.position.z > max.z)
            {
                this.context.offset.position.z = max.z;
            }
            if(this.context.offset.position.z < -max.z)
            {
                this.context.offset.position.z = -max.z;
            }
        }
    }
    this.animate();
}

sly.Animator.prototype.stepToFrame = function(frame,normalSpeed,rotationSpeed)
{
    var normalSpeed = normalSpeed*this.GLOBAL.timeSpeed;
    var rotationSpeed = rotationSpeed*this.GLOBAL.timeSpeed;

    if(typeof (frame.position) != "undefined")
    {
        this.stepToFrameMovement(frame.position,normalSpeed);
    }
    if(typeof (frame.rotation) != "undefined")
    {
        this.stepToFrameRotation(frame.rotation,rotationSpeed);
    }
}

sly.Animator.prototype.isInterfaceAttached = function()
{
    if(typeof this.interface!='undefined')
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

sly.Animator.prototype.stepToFrameMovement = function(frame,speed)
{

    var xDifferance = frame.x - this.context.offset.position.x;
    var yDifferance = frame.y - this.context.offset.position.y;
    var zDifferance = frame.z - this.context.offset.position.z;

    if(xDifferance > speed || xDifferance < -speed)
    {
        if(xDifferance < 0)
        {
            this.context.offset.position.x-=speed;
        }
        else
        {
            this.context.offset.position.x+=speed;
        }
    }
    else this.context.offset.position.x = frame.x;

    if(yDifferance > speed || yDifferance < -speed)
    {
        if(yDifferance < 0)
        {
            this.context.offset.position.y-=speed;
        }
        else
        {
            this.context.offset.position.y+=speed;
        }
    }
    else this.context.offset.position.y = frame.y;

    if(zDifferance > speed || xDifferance < -speed)
    {
        if(zDifferance < 0)
        {
            this.context.offset.position.z-=speed;
        }
        else
        {
            this.context.offset.position.z+=speed;
        }
    }
    else this.context.offset.position.z = frame.z;
}

sly.Animator.prototype.stepToFrameRotation = function(frame,speed)
{

    var xRotation = frame.x - this.context.offset.rotation.x;
    var yRotation = frame.y - this.context.offset.rotation.y;
    var zRotation = frame.z - this.context.offset.rotation.z;

    if(xRotation > speed || xRotation  < -speed)
    {
        if(xRotation  < 0)
        {
            this.context.offset.rotation.x-=speed;
        }
        else
        {
            this.context.offset.rotation.x+=speed;
        }
    }
    else this.context.offset.rotation.x = frame.x;

    if(yRotation > speed || yRotation  < -speed)
    {
        if(yRotation  < 0)
        {
            this.context.offset.rotation.y-=speed;
        }
        else
        {
            this.context.offset.rotation.y+=speed;
        }
    }
    else this.context.offset.rotation.y = frame.y;

    if(zRotation > speed || zRotation  < -speed)
    {
        if(zRotation  < 0)
        {
            this.context.offset.rotation.z-=speed;
        }
        else
        {
            this.context.offset.rotation.z+=speed;
        }
    }
    else this.context.offset.rotation.z = frame.z;
}
