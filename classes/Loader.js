sly.Loader = function()
{
    this.ajaxRequests = {};
    this.ajaxRequests.Current = 0;
    this.ajaxRequests.Total = 4;

    this.sounds = {};
    this.sounds.wind = 0;
    this.sounds.playWind = function(){};
    this.sounds.music = 0;

    this.appWindow = jQuery("#container");
}

sly.Loader.prototype.readySignal = function(type, data, controller, controllerData)
{
    if(type == "ajaxRequest")
    {
        this.ajaxRequests.Current++;
    }

    if(type == "canPlay" && data == "wind" && !this.sounds.wind)
    {
        this.sounds.wind = 1;
        this.sounds.playWind = function()
        {
            controller(controllerData);
        }
    }

    if(this.isPageLoaded())
    {
        this.loadPage();
    }
}

sly.Loader.prototype.isPageLoaded = function()
{
    if(this.ajaxRequests.current < this.ajaxRequests.Total)
    {
        return 0;
    }

    if(!this.sounds.wind)
    {
        return 0;
    }

    return 1;
}

sly.Loader.prototype.loadPage = function()
{
    this.sounds.playWind();

    this.appWindow.animate(
    {
        opacity: 1
    },
    2000);


}
