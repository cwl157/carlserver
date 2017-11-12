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
           // _this.response = success.data;
            _this.response = new BlogViewModel();
            var i = 0;
            var j = 0;
            for (i = 0; i < success.data.length; i++)
            {
                var b = success.data[i];
                var pvm = new PostViewModel();
                pvm.id = b.id;
                pvm.title = b.title;
                pvm.body = $sce.trustAsHtml(b.body);
                pvm.summary = $sce.trustAsHtml(b.summary);
                pvm.author = b.author;
                pvm.publishedDate = new Date(b.publishedDate);
                pvm.friendlyUri = b.friendlyUri;
                pvm.isPublished = b.isPublished;
                _this.response.posts.push(pvm);
            }
            _this.response.responseCode = success.status;
            _this.response.error = '';
            return _this.response;
        }, function(failure) {
            _this.response = new BlogViewModel();
            _this.response.responseCode = failure.status;
            _this.response.error = failure.statusText;
            throw _this.response;
        });
    };

    _this.fetchSingle = function(uri) {
        var req = {
            method: 'GET',
            url: 'api/blog/'+uri,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: window.timeout
        };
        return $http(req).then(function(success) {
            _this.response = new PostViewModel();
            _this.response.id = success.data.id;
            _this.response.title = success.data.title;
            _this.response.body = $sce.trustAsHtml(success.data.body);
            _this.response.summary = $sce.trustAsHtml(success.data.summary);
            _this.response.author = success.data.author;
            _this.response.publishedDate = new Date(success.data.publishedDate);
            _this.response.friendlyUri = success.data.friendlyUri;
            _this.response.isPublished = success.data.isPublished;
            if (success.data.comments)
            {
                for (j = 0; j < success.data.comments.length; j++)
                {
                    var c = new CommentViewModel();
                    c.id = success.data.comments[j].id;
                    c.name = success.data.comments[j].name;
                    c.message = success.data.comments[j].message;
                    c.postUri = success.data.comments[j].postUri;
                    c.createDate = new Date(success.data.comments[j].createDate);
                    _this.response.comments.push(c);
                }
            }
            _this.response.responseCode = success.status;
            _this.response.error = '';
            return _this.response;
        }, function(failure) {
            _this.response = new PostViewModel();
            _this.response.responseCode = failure.status;
            _this.response.error = failure.statusText;
            throw _this.response;
        });
    };

}]);