sly.CloudsAnimator = function()
{
    this.speed = 10;
}

sly.CloudsAnimator.prototype = new sly.Animator();

sly.CloudsAnimator.prototype.wind = function()
{
    this.frames.activeFrame.position.z += this.speed*this.GLOBAL.timeSpeed;
}