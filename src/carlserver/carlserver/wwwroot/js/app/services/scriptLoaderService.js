app.service('ScriptLoaderService', [function(){
    var _this = this;

    _this.load = function(scriptUrl) {
        var scriptEl = document.createElement('script');
        scriptEl.onload = function() {
            console.log(scriptUrl + " loaded");
        };
        scriptEl.src = scriptUrl;
        document.head.appendChild(scriptEl);
    }
}]);