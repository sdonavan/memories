sly.TerrainEngine = function()
{
    this.terrains = [];
    this.terrains.behind = null;
    this.terrains.current = null;
    this.terrains.infront = null;
    this.camera = null;

    this.pieceWidth = 19400;
    this.cloudsSpeed = 10;
}

sly.TerrainEngine.prototype = new sly.CompositeObject();

sly.TerrainEngine.prototype.init = function(terrain1, terrain2, terrain3, camera)
{
    this.addChild(terrain1);
    this.addChild(terrain2);
    this.addChild(terrain3);
    this.camera = camera;

    this.terrains.current = this.children[0];
    this.terrains.current.physicalBody.position.z = this.getPosition("current");
    this.terrains.behind = this.children[1];
    this.terrains.behind.physicalBody.position.z = this.getPosition("behind");
    this.terrains.infront = this.children[2];
    this.terrains.infront.physicalBody.position.z = this.getPosition("infront");

    this.addPhysicalBody();

}

sly.TerrainEngine.prototype.update = function()
{

    this.updateChildren();

    if(this.camera.position.z < this.terrains.current.physicalBody.position.z )
    {
        this.swap(-1);
    }
    if(this.camera.position.z > this.terrains.behind.physicalBody.position.z )
    {
        this.swap(1);
    }
}

sly.TerrainEngine.prototype.swap = function(direction)
{
    if(direction == -1)
    {
        var current = this.terrains.current;
        var behind = this.terrains.behind;
        var infront = this.terrains.infront;

        this.terrains.current = infront;
        this.terrains.infront = behind;
        this.terrains.behind = current;

        this.terrains.infront.physicalBody.position.z = this.getPosition("infront");
    }

    else
    {
        var current = this.terrains.current;
        var behind = this.terrains.behind;
        var infront = this.terrains.infront;

        this.terrains.current = behind;
        this.terrains.infront = current;
        this.terrains.behind = infront;

        this.terrains.behind.physicalBody.position.z = this.camera.position.z + this.pieceWidth;
    }
}

sly.TerrainEngine.prototype.addPhysicalBody = function()
{
    var i, len;
    len = this.terrains.length;
        for(i = 0; i < len; i++){
        this.physicalBody.add(this.terrains[i].physicalBody);
    }
}

sly.TerrainEngine.prototype.swapSignal = function()
{
    this.swap();
}

sly.TerrainEngine.prototype.getPosition = function(position)
{
    if(position == "current")
    {
        return (this.camera.position.z - this.pieceWidth);
    }
    if(position == "behind")
    {
        return (this.camera.position.z);
    }
    if(position == "infront")
    {
        return (this.camera.position.z - this.pieceWidth*2);
    }
    return 0;
}