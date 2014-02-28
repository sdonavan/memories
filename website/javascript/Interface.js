function Interface()
{
}

Interface.prototype = new Interface();

Interface.prototype.init = function(facebook, eventEngine)
{
    this.facebook = facebook;
    this.eventEngine = eventEngine;

    this.visualElements =
    {
        button : jQuery(".connect"),
        title: jQuery(".title"),
        author: jQuery(".author"),
        music: jQuery(".music"),
        movement: jQuery(".movement")
    }

    this.canPlayMusic = 0;
    this.animationBegan = 0;
    this.playMusic = new function(){};

    this.bindFacebookButton();
}

Interface.prototype.bindFacebookButton = function()
{
    var classReference = this;

    this.visualElements.button.unbind("click");

    var receiveStatus = function(status)
    {
        if(status == "connected")
        {
            classReference.connectStage();
        }

    }

    this.visualElements.button.bind("click",function()
    {
        classReference.facebook.connect(receiveStatus);
    })
}

Interface.prototype.connectStage = function()
{
    var stageTime = 1;
    var classReference = this;

    this.visualElements.button.fadeOut(300,classReference.introStage());
}

Interface.prototype.introStage = function()
{
    this.animationBegan = 1;
    if(this.canPlayMusic == 1)
    {
        var stageTime = 1.5;
        var classReference = this;
        var fadeSpeed = 3000;
        var timeOutSpeed = 300;
        var timeBeforeActive = 3000;
        var initialTime = 1500;

        var title = classReference.visualElements.title;
        var author = classReference.visualElements.author;
        var music = classReference.visualElements.music;

        this.playMusic();

        var onMusicFadeIn = function()
        {
            setTimeout(
                function()
                {
                    classReference.activeStage();
                },
                timeBeforeActive
            )
        }

        var onAuthorFadeIn = function()
        {
            setTimeout(
                function()
                {
                    music.fadeIn(fadeSpeed,onMusicFadeIn);
                },
                timeOutSpeed
            )
        }

        var onTitleFadeIn = function()
        {
            setTimeout(
                function()
                {
                    author.fadeIn(fadeSpeed, onAuthorFadeIn);
                }
                ,timeOutSpeed
            )
        }

        setTimeout(
            function()
            {
                title.fadeIn(fadeSpeed,onTitleFadeIn);
            }
            ,initialTime
        )


    }
}

Interface.prototype.activeStage = function()
{
    var stageTime = 0;
    var classReference = this;
    var fadeSpeed = 1000;

    var onFadeOut = function()
    {
        classReference.visualElements.movement.fadeIn(fadeSpeed,
            function()
            {
                classReference.eventEngine.activate();
                classReference.eventEngine.addSubscriber(classReference);
            })
    }

    classReference.visualElements.music.fadeOut(fadeSpeed);
    classReference.visualElements.author.fadeOut(fadeSpeed);
    classReference.visualElements.title.fadeOut(fadeSpeed,onFadeOut);

}

Interface.prototype.readySignal = function(signal, data, controller, controllerData)
{
    var classReference = this;
    var fadeSpeed = 1000;

    if(signal == "keydown")
    {
        if(data == "up")
        {
            classReference.visualElements.movement.fadeOut(fadeSpeed);
            classReference.eventEngine.removeSubscriber(classReference);
        }
    }

    if(signal == "canPlay" && data == "music")
    {
        this.canPlayMusic = 1;
        this.playMusic = function()
        {
            controller(controllerData);
        }
        if(this.animationBegan == 1)
        {
            this.introStage();
        }
    }
}