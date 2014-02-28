sly.EveAnimator = function()
{

}

sly.EveAnimator.prototype = new sly.Animator();

sly.EveAnimator.prototype.init = function(object)
{
    sly.Animator.prototype.init.call(this,object);

    this.createChildrenAnimators();

    this.headAnimator = this.object.head.Animator;
    this.bodyAnimator = this.object.body.Animator;
    this.leftArmAnimator = this.object.leftArm.Animator;
    this.rightArmAnimator = this.object.rightArm.Animator;

    this.context.standing = {};
    this.context.standing.speed = 0.6;
    this.context.standing.direction = 0;

    this.context.standing.EndFrame =
    {
        body: {
            position: {x: 0, y:-40, z: 0}
        },
        hands: {
            position: {x: 0, y:-56, z: 0}
        },
        head: {
            position: {x: 0, y:-48, z: 0}
        }
    };
    this.context.standing.StartFrame =
    {
        position: {x: 0, y: 0, z: 0}
    };

    this.context.closing = {}
    this.context.closing.speed = 1.6;
    this.context.closing.rspeed = 0.18;
    this.context.closing.stage = 1;

    this.context.closing.stage1Body =
    {
        position: {x: 0, y: 60, z: 0},
        rotation: {x: 0, y: 0, z: 0}
    }
    this.context.closing.stage1LeftArm =
    {
        position: {x: 30, y: -28, z: 0},
        rotation: {x: Math.PI, y: 0, z: 0.2}
    }
    this.context.closing.stage1RightArm =
    {
        position: {x: -30, y: 30, z: 0},
        rotation: {x: Math.PI, y: 0, z: -0.2}
    }

    this.context.closing.stage2Right =
    {
        position: {x: 26, y: 19, z: 4},
        rotation: {x: Math.PI, y: 0, z: -0.2}
    }
    this.context.closing.stage2Left =
    {
        position: {x: -28, y: -25, z: 4},
        rotation: {x: Math.PI, y: 0, z: 0.2}
    }
    this.context.closing.turned = {};
    this.context.closing.turnedBackwards = {};
    this.context.closing.turned.rotation = {x: -1,y: -Math.PI,z: 0}
    this.context.closing.turnedBackwards.rotation = {x: 1,y: 0,z: 0}

    this.context.closing.turningSpeed = 0.13;


    this.context.opening = {};
    this.context.opening.speed = 1;
    this.context.opening.rspeed = 1;

    this.context.opening.turningSpeed = 0.16;

    this.context.opening.baseRotation =
    {
        rotation: this.frames.baseFrame.rotation
    }

    this.context.opening.stage1Body =
    {
        position: {x: 0, y: 60, z: 0},
        rotation: {x: 0, y: 0, z: 0}
    }

    this.context.opening.stage1Left =
    {
        position: {x: 30, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
    }

    this.context.opening.stage1Right =
    {
        position: {x: -30, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
    }

    this.context.moving =
    {
        position: {x: 0, y: 0, z: 0},
        rotation: {x: -1, y: -Math.PI, z: 0}
    }


}

sly.EveAnimator.prototype.closingAnimation = function(direction)
{
    var direction = direction;

    if(this.leftArmAnimator.context.offset.rotation.x == Math.PI)
    {
        this.context.closing.stage = 2;
    }
    else
    {
        this.context.closing.stage = 1;
    }

    if(this.context.closing.stage == 1)
    {
        this.leftArmAnimator.stepToFrame(this.context.closing.stage1LeftArm,this.context.closing.speed,this.context.closing.rspeed);
        this.rightArmAnimator.stepToFrame(this.context.closing.stage1RightArm,this.context.closing.speed,this.context.closing.rspeed);
        this.bodyAnimator.stepToFrame(this.context.closing.stage1Body,this.context.closing.speed*3,0);
        this.headAnimator.stepToFrame(this.context.closing.stage1Body,this.context.closing.speed*3,0);
    }

    if(this.context.closing.stage == 2)
    {
        this.leftArmAnimator.stepToFrame(this.context.closing.stage2Left,this.context.closing.speed*2.4,this.context.closing.rspeed);
        this.rightArmAnimator.stepToFrame(this.context.closing.stage2Right,this.context.closing.speed*2.4,this.context.closing.rspeed);
        this.bodyAnimator.stepToFrame(this.bodyAnimator.frames.baseFrame,this.context.closing.speed*3,0);
        this.headAnimator.stepToFrame(this.headAnimator.frames.baseFrame,this.context.closing.speed*3,0);
    }

    if(direction == "forward")
    {
        this.stepToFrame(this.context.closing.turned,0,this.context.closing.turningSpeed);
    }
    if(direction == "backward")
    {
        this.stepToFrame(this.context.closing.turnedBackwards,0,this.context.closing.turningSpeed);
    }

    // End animation. Must be made universal
    if(this.rightArmAnimator.context.offset.position.x == this.context.closing.stage2Right.position.x)
    {
        if(this.isInterfaceAttached())
        {
            this.interface.readySignal("closed");
        }
    }

    this.headAnimator.animate();
    this.bodyAnimator.animate();
    this.leftArmAnimator.animate();
    this.rightArmAnimator.animate();
    this.animate();
}

sly.EveAnimator.prototype.openingAnimation = function()
{
    if(this.rightArmAnimator.context.offset.rotation.x == 0)
    {
        this.context.opening.stage = 2;
    }
    else
    {
        this.context.opening.stage = 1;
    }

    if(this.context.opening.stage == 1)
    {
        this.leftArmAnimator.stepToFrame(this.context.opening.stage1Left,this.context.opening.speed*3,this.context.closing.rspeed);
        this.rightArmAnimator.stepToFrame(this.context.opening.stage1Right,this.context.opening.speed*3,this.context.closing.rspeed);
        this.bodyAnimator.stepToFrame(this.context.opening.stage1Body,this.context.opening.speed*3,0);
        this.headAnimator.stepToFrame(this.context.opening.stage1Body,this.context.opening.speed*3,0);
    }

    if(this.context.opening.stage == 2)
    {
        this.leftArmAnimator.stepToFrame(this.leftArmAnimator.frames.baseFrame,this.context.opening.speed*2.4,this.context.opening.rspeed);
        this.rightArmAnimator.stepToFrame(this.rightArmAnimator.frames.baseFrame,this.context.opening.speed*2.4,this.context.opening.rspeed);
        this.bodyAnimator.stepToFrame(this.bodyAnimator.frames.baseFrame,this.context.opening.speed*3,0);
        this.headAnimator.stepToFrame(this.headAnimator.frames.baseFrame,this.context.opening.speed*3,0);
    }

    this.stepToFrame(this.context.opening.baseRotation,0,this.context.opening.turningSpeed);

    if(this.bodyAnimator.context.offset.position.y == this.bodyAnimator.frames.baseFrame.position.y)
    {
        if(this.isInterfaceAttached())
        {
            this.interface.readySignal("opened");
        }
    }

    this.headAnimator.animate();
    this.bodyAnimator.animate();
    this.leftArmAnimator.animate();
    this.rightArmAnimator.animate();
    this.animate();
}


sly.EveAnimator.prototype.standingAnimation = function()
{
    if(this.bodyAnimator.frames.activeFrame.position.y == this.context.standing.EndFrame.body.position.y)
    {
        this.context.standing.direction = 1;
    }
    if(this.bodyAnimator.frames.activeFrame.position.y == this.context.standing.StartFrame.position.y)
    {
        this.context.standing.direction = 0;
    }

    if(this.context.standing.direction == 0)
    {
        this.headAnimator.stepToFrame(this.context.standing.EndFrame.head ,this.context.standing.speed*0.8,0);
        this.bodyAnimator.stepToFrame(this.context.standing.EndFrame.body ,this.context.standing.speed,0);
        this.leftArmAnimator.stepToFrame(this.context.standing.EndFrame.hands ,this.context.standing.speed*1.4,0);
        this.rightArmAnimator.stepToFrame(this.context.standing.EndFrame.hands ,this.context.standing.speed*1.4,0);
    }
    else
    {
        this.headAnimator.stepToFrame(this.context.standing.StartFrame ,this.context.standing.speed*0.8,0);
        this.bodyAnimator.stepToFrame(this.context.standing.StartFrame ,this.context.standing.speed,0);
        this.leftArmAnimator.stepToFrame(this.context.standing.StartFrame ,this.context.standing.speed*1.4,0);
        this.rightArmAnimator.stepToFrame(this.context.standing.StartFrame ,this.context.standing.speed*1.4,0);
    }
    this.headAnimator.animate();
    this.bodyAnimator.animate();
    this.leftArmAnimator.animate();
    this.rightArmAnimator.animate();
}