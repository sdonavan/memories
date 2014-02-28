sly.EveInterface = function()
{
    this.init();
}

sly.EveInterface.prototype = new sly.Interface();

sly.EveInterface.prototype.init = function()
{
    this.states = {};
    this.states.standing = 1;
    this.states.closing = 0;
    this.states.opening = 0;
    this.states.moving = 0;
    this.states.rotating = 0;

    this.stateData = {};
    this.stateData.closing = null;

    this.stateData.moving = {};
    this.stateData.moving.direction = null;
    this.stateData.moving.speed = 70;

    this.stateData.rotating = {};
    this.stateData.rotating.direction = null;
    this.stateData.rotating.speed = 10;
    this.stateData.rotating.max = 800;
}

sly.EveInterface.prototype.update = function()
{
    this.dispatchState();
}

sly.EveInterface.prototype.readySignal = function(signal, key)
{
    if(signal == "opened")
    {
        this.switchState("standing");
    }
    if(signal == "closed")
    {
        this.switchState("moving");
        if(this.GLOBAL.currentlyPressed['up'])
        {
            this.stateData.moving.direction = "forward";
        }
        if(this.GLOBAL.currentlyPressed['down'])
        {
            this.stateData.moving.direction = "backward";
        }
    }
    if(signal == "keydown")
    {
        if(key == "up")
        {
            this.stateData.closing = "forward";
            this.switchState("closing");
        }
        if(key == "down")
        {
            this.stateData.closing  = "backward";
            this.switchState("closing");
        }
        if(key == "left")
        {
            this.stateData.rotating.direction  = "left";
            this.states.rotating = 1;
        }
        if(key == "right")
        {
            this.stateData.rotating.direction  = "right";
            this.states.rotating = 1;
        }
    }
    if(signal == "keyup")
    {
        if(key == "up" || key == "down")
        {
            this.switchState("opening");
        }
        if(key == "left")
        {
            if(!this.GLOBAL.currentlyPressed["right"])
            {
                this.states.rotating = 0;
            }
        }
        if(key == "right")
        {
            if(!this.GLOBAL.currentlyPressed["left"])
            {
                this.states.rotating = 0;
            }
        }
    }
}

sly.Interface.prototype.dispatchState = function()
{


    if(this.states.standing == 1)
    {
        this.animator.standingAnimation();
    }

    if(this.states.closing == 1)
    {
        this.animator.closingAnimation(this.stateData.closing);
    }

    if(this.states.rotating == 1)
    {
        var speed = this.stateData.rotating.speed;
        if(this.stateData.rotating.direction == "right")
        {
            speed = -speed;
        }
        this.animator.move({x:-(speed)},{x: this.stateData.rotating.max});
    }

    if(this.states.moving == 1)
    {
        var speed = this.stateData.moving.speed;
        if(this.stateData.moving.direction == "backward")
        {
            speed = -speed;
        }
        this.animator.move({z:-(speed)},{});
    }

    if(this.states.opening == 1)
    {
        this.animator.openingAnimation();
    }
}

sly.Interface.prototype.switchState = function(state)
{
    var rotating = this.states.rotating;
    var i, len;
    for(var key in this.states) {
        this.states[key] = 0;
    }
    this.states[state] = 1;
    this.states.rotating = rotating;
}