var sly = {};

sly.Functions =
{
    checkExistence: function(item)
    {
        if(typeof(item) == "undefined")
        {
            return 0;
        }
        return 1;
    }
}