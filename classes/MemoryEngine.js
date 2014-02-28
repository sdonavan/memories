sly.MemoryEngine = function()
{
    this.pictures = new Array();
    this.currentMemory = 0;
    this.maxMemory = 0;
    this.physicalBody = new THREE.Object3D();
    this.timeSlowed = 0;
    this.timeSlowDistance = 2000;
    this.minDistance = 8500;

}

sly.MemoryEngine.prototype = new sly.BaseObject();

sly.MemoryEngine.prototype.init = function(camera, animator)
{
    this.camera = camera;
    this.animator = animator;
}

sly.MemoryEngine.prototype.update = function()
{
    if(this.pictures.length)
    {
        if(this.physicalBody.children.length == 0)
        {
            this.loadMemory(this.pictures[this.currentMemory], this.camera.body.position.z-this.minDistance);
        }

        this.updateMemory();
    }
}

sly.MemoryEngine.prototype.updateMemory = function()
{
    var classReference = this;

    var cameraPosition = this.camera.body.position.z;

    var memoryPosition = this.physicalBody.children[0].position.z;

    var direction = this.camera.getDirection();

    var nextMemory = undefined;

    if(cameraPosition < memoryPosition)
    {
        nextMemory = this.currentMemory+1;
    }
    if(cameraPosition > memoryPosition + this.minDistance)
    {
        nextMemory = this.currentMemory-1;
    }

    if((cameraPosition < memoryPosition + this.timeSlowDistance) && (this.timeSlowed == 0) && (this.currentMemory == this.maxMemory))
    {
        classReference.animator.GLOBAL.timeSpeed = 0.15;
        setTimeout(function(){
            classReference.animator.GLOBAL.timeSpeed = 1;
        },1200)
        this.timeSlowed = 1;
    }

    var memoryExists =  sly.Functions.checkExistence(this.pictures[nextMemory]);

    if(memoryExists)
    {
        var position = cameraPosition;

        if(direction == -1)
        {
            position = cameraPosition - this.minDistance;
        }

        if(nextMemory > this.maxMemory)
        {
            this.maxMemory = nextMemory;
            this.timeSlowed = 0;
        }

        this.loadMemory(this.pictures[nextMemory], position )
        this.currentMemory = nextMemory;
    };
}

sly.MemoryEngine.prototype.loadMemory = function(memory, position)
{
    var mem = new sly.Memory(memory.image, memory.width*2.4, memory.height*2.4);

    mem.physicalBody.position.z = position ;

    var memories = this.physicalBody.children;

    if(memories.length)
    {
        this.physicalBody.remove(memories[0]);
    }

    this.physicalBody.add(mem.physicalBody);
}

sly.MemoryEngine.prototype.readySignal = function(signal, data)
{
    if(signal == "links")
    {
        this.dispatchLinks(data);
    }
}


sly.MemoryEngine.prototype.dispatchLinks = function(links)
{
    var length = links.length;
    for(var i=0; i<length; i++)
    {
        this.fetchPicture(links[i]);
    }
}

sly.MemoryEngine.prototype.fetchPicture = function(picture)
{
    var texture = THREE.ImageUtils.loadTexture(picture.source);

    var memory =
    {
        image: texture,
        width: picture.width,
        height: picture.height
    }
    this.pictures.push(memory);
}

