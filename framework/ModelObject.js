sly.ModelObject = function()
{
    this.physicalBody = new THREE.Object3D();
}

sly.ModelObject.prototype = new sly.BaseObject();

sly.ModelObject.prototype.init = function(data)
{
    var classReferance = this;
    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load( data.url,onModelLoad);


    function onModelLoad(geometry, materials)
    {
        var material;
        if(data.textured)
        {
            material = new THREE.MeshFaceMaterial(materials);
        }
        else
        {
            material = new THREE.MeshPhongMaterial({color: 0xffffff, ambient: 0xffffff,specular: 0x000000 });
        }
        var mesh = new THREE.Mesh( geometry, material );

        classReferance.physicalBody.add(mesh);
    }
}

