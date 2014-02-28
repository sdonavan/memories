
FacebookEngine = function()
{
    this.interfaceExists = false;
    this.photos = [];
    this.status = "disconnected";
}

FacebookEngine.prototype = new FacebookEngine();

FacebookEngine.prototype.init = function()
{
    window.fbAsyncInit = function() {

        FB.init({
            appId      : '300822680047083', // App ID from the App Dashboard
            status     : false, // check the login status upon init?
            cookie     : true, // set sessions cookies to allow your server to access the session?
            xfbml      : true  // parse XFBML tags on this page?
        });


    };

    // Load the SDK's source AsynchronouFacebookEngine
    // Note that the debug version is being actively developed and might
    // contain some type checks that are overly strict.
    // Please report such bugs using the bugs tool.
    (function(d, debug){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
        ref.parentNode.insertBefore(js, ref);
    }(document, /*debug*/ false));
}

FacebookEngine.prototype.connect = function(callback)
{
    var classReference = this;

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            callback("connected");
            classReference.status = "connected";
            classReference.startGettingLinks(response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
            // not_authorized
            login();

        } else {
            // not_logged_in
            login();
        }
    });

    function login() {
        FB.login(
            function (response) {
                if (response.authResponse) {
                    callback("connected");
                    classReference.status = "connected";
                    classReference.startGettingLinks(response.authResponse.accessToken);
                } else {
                    callback("disconnected");
                    // cancelled
                }
            },
            {scope: 'user_photos'});
    }
}

FacebookEngine.prototype.disconnect = function()
{
    this.status = "disconnected";
    this.photos = [];
}

FacebookEngine.prototype.startGettingLinks = function(accessToken)
{
    var classReference = this;

    var photosUrl = "me/photos?fields=source,width,height";
    var accessToken = accessToken;
    var url = "https://graph.facebook.com/"+photosUrl+"&access_token="+accessToken;

    classReference.getLinks(url);
}

FacebookEngine.prototype.getLinks = function(url)
{
    var classReference = this;

    if(classReference.status == "connected")
    {
        jQuery.ajax({
            dataType: "json",
            url: url,
            success: function(data)
            {
                classReference.readySignal("httpReceived", data);
            }
        })
    }
}

FacebookEngine.prototype.readySignal = function(signal, data)
{
    var classReference = this;

    if(classReference.status == "connected")
    {
        if(signal == "httpReceived")
        {
            // If there is a next page, get the next page
            if(typeof(data.paging)!= "undefined")
            {
                var nextPage = data.paging.next;
                classReference.getLinks(nextPage);
            }
            // Push the photos links in a container
            if(typeof(data.data)!= "undefined")
            {
                classReference.dispatchLinks(data.data);
            }
        }
    }
}

FacebookEngine.prototype.dispatchLinks = function(links)
{
    var classReference = this;

    var mergedArray = classReference.photos.concat(links);

    classReference.photos = mergedArray;

    if(this.interfaceExists)
    {
        this.interface.readySignal("links", links);
    }
}


FacebookEngine.prototype.connectToInterface = function(object)
{
    this.interface = object;
    this.interfaceExists = true;
}