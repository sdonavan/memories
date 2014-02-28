sly.Interface = function()
{
}

sly.Interface.prototype = new sly.BaseObject();

sly.Interface.prototype.GLOBAL = {}

sly.Interface.prototype.attach= function(animator)
{
    animator.interface = this;
    this.animator = animator;
}

sly.Interface.prototype.attachToObject= function(object)
{
    this.object = object;
}

sly.Interface.prototype.readySignal = function()
{

}