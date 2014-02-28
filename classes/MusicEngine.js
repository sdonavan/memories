sly.MusicEngine = function()
{
    this.tracks = new Array();
    this.subscribers = new Array();
}

sly.MusicEngine.prototype = new sly.MusicEngine();

sly.MusicEngine.prototype.addSubscriber = function(subscriber)
{
    this.subscribers.push(subscriber);
}

sly.MusicEngine.prototype.removeSubscriber = function(subscriber)
{
    var classReference = this;

    var index = classReference.subscribers.indexOf(subscriber);
    classReference.subscribers.splice(index, 1);
}

sly.MusicEngine.prototype.sendSignals = function(signal, data, controller, controllerData)
{
    var i, len;
    len = this.subscribers.length;
    for(i = 0; i < len; i++){
        this.subscribers[i].readySignal(signal, data, controller, controllerData);
    }
}

sly.MusicEngine.prototype.init = function()
{
    var classReference = this;

    if(typeof(Loader)!= undefined)
    {
        this.addSubscriber(Loader);
    }

    classReference.audio = new Audio();

    classReference.canPlay =
    {
        mp3: null,
        ogg: null
    };

    classReference.canPlay.mp3 = classReference.audio.canPlayType('audio/mp3;');
    classReference.canPlay.ogg = classReference.audio.canPlayType('audio/ogg;');

    classReference.initMusic();
    classReference.initWind();

}

sly.MusicEngine.prototype.initWind = function()
{
    var classReference = this;

    //Init wind
    if(classReference.canPlay.ogg.length)
    {
        var wind = new Audio("models/music/wind.ogg");
    }
    else
    {
        var wind = new Audio("models/music/wind.mp3");
    }
    this.tracks.wind = wind;
    this.tracks.wind.volume = 0.80;


    jQuery(wind).on("canplay",function(){
        classReference.sendSignals("canPlay","wind",classReference.playSound,wind);
    })
}

sly.MusicEngine.prototype.initMusic = function()
{
    var classReference = this;

    //Init wind
    if(classReference.canPlay.ogg.length)
    {
        var music= new Audio("models/music/NoTimeToRun.ogg");
    }
    else
    {
        var music = new Audio("models/music/NoTimeToRun.mp3");
    }
    this.tracks.music = music;
    this.tracks.music.volume = 1;


    jQuery(music).on("canplay",function(){
        classReference.sendSignals("canPlay","music",classReference.playSound,music);
    })
}

sly.MusicEngine.prototype.playSound = function(sound)
{
    var loop = new sly.MusicLoop();
    loop.init(sound);
}

sly.MusicLoop = function()
{
}

sly.MusicLoop.prototype = new sly.MusicLoop();

sly.MusicLoop.prototype.init =  function(track)
{
    var classReference = this;

    classReference.track = track;

    classReference.duration = track.duration - 0.6;

    track.play();

    setInterval(function(){
        classReference.track.currentTime = 0.1;
    },classReference.duration*1000);

}

