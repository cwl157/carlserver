// TODO: Do everyting with js view models. Construct the js view model from whatever the service gets and return that to the controller. The controller decides how to use the view model
app.service('BlogService',
['$http', '$q', '$sce', function(
  $http, $q, $sce)
{
    var _this = this;

    _this.response = null;

    _this.fetch = function() {
        var req = {
            method: 'GET',
            url: 'api/blog/',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: window.timeout
        };

        return $http(req).then(function(success) {
           // console.log(JSON.stringify(success));
           // console.log(JSON.stringify(success.data));
           // _this.response = success.data;
            _this.response = new BlogViewModel();
            console.log("in then");
            var i = 0;
            for (i = 0; i < success.data.length; i++)
            {
                var b = success.data[i];
                var pvm = new PostViewModel();
                pvm.id = b.id;
                pvm.title = b.title;
                pvm.body = $sce.trustAsHtml(b.body);
                pvm.summary = $sce.trustAsHtml(b.summary);
                pvm.author = b.author;
                pvm.publishedDate = b.publishedDate;
                pvm.friendlyUri = b.friendlyUri;
                _this.response.posts.push(pvm);
            }
            _this.response.responseCode = success.status;
            _this.response.error = '';
            return _this.response;
        }, function(failure) {
            console.log("Failed");
            console.log(JSON.stringify(failure));
            throw failure;
        });
    };
}]);