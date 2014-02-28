sly.EventEngine = function()
{
    this.subscribers = [];

    this.status = "inactive";

    this.bindKeys();
}
sly.EventEngine.prototype = new sly.BaseObject();

sly.EventEngine.prototype.addSubscriber = function(subscriber)
{
    this.subscribers.push(subscriber);
    this.attach(subscriber);
}

sly.EventEngine.prototype.removeSubscriber = function(subscriber)
{
    var classReference = this;

    var index = classReference.subscribers.indexOf(subscriber);
    classReference.subscribers.splice(index, 1);
}

sly.EventEngine.prototype.sendSignals = function(signal, data)
{
    if(this.status == "active")
    {
        var i, len;
        len = this.subscribers.length;
        for(i = 0; i < len; i++){
            this.subscribers[i].readySignal(signal, data);
        }
    }
}

sly.EventEngine.prototype.attach = function(object)
{
    var globalExistence = sly.Functions.checkExistence(object.GLOBAL);

    if(globalExistence)
    {
        object.GLOBAL.currentlyPressed = this.currentlyPressed;
    }
}

sly.EventEngine.prototype.activate = function()
{
    this.status = "active";
}

sly.EventEngine.prototype.bindKeys = function()
{
    var context = jQuery("body");

    context.unbind('keydown');
    context.unbind('keyup');

    this.currentlyPressed =
    {
        'up': 0,
        'down': 0,
        'left': 0,
        'right': 0
    };

    function bind(classReference)
    {
        context.bind("keydown",

            function(e){
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                // W key
                if(keyCode == 87)
                {
                    if(classReference.currentlyPressed['up'] == 0)
                    {
                        classReference.currentlyPressed['up'] = 1;
                        classReference.sendSignals("keydown","up");
                    }
                }
                // S key
                if(keyCode == 83)
                {
                    if(classReference.currentlyPressed['down'] == 0)
                    {
                        classReference.currentlyPressed['down'] = 1;
                        classReference.sendSignals("keydown","down");
                    }
                }
                // A key
                if(keyCode == 65)
                {
                    if(classReference.currentlyPressed['left'] == 0)
                    {
                        classReference.currentlyPressed['left'] = 1;
                        classReference.sendSignals("keydown","left");
                    }
                }
                // D key
                if(keyCode == 68)
                {
                    if(classReference.currentlyPressed['right'] == 0)
                    {
                        classReference.currentlyPressed['right'] = 1;
                        classReference.sendSignals("keydown","right");
                    }
                }
            });

        context.bind("keyup",
            function(e){
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                // W key
                if(keyCode == 87)
                {
                    classReference.currentlyPressed['up'] = 0;
                    classReference.sendSignals("keyup","up");
                }
                // S key
                if(keyCode == 83)
                {
                    classReference.currentlyPressed['down'] = 0;
                    classReference.sendSignals("keyup","down");
                }
                // A key
                if(keyCode == 65)
                {
                    classReference.currentlyPressed['left'] = 0;
                    classReference.sendSignals("keyup","left");
                }
                // D key
                if(keyCode == 68)
                {
                    classReference.currentlyPressed['right'] = 0;
                    classReference.sendSignals("keyup","right");
                }

            });
    }
    bind(this);
}

