app.service('EncodeStringService',
[function()
{
    var _this = this;

    _this.encodeString = function(stringToEncode) {
        if(stringToEncode) {
            return window.encodeURIComponent(stringToEncode); 
        }
        return ""; 
    }
}]);