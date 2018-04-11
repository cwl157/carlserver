// TODO: Do everyting with js view models. Construct the js view model from whatever the service gets and return that to the controller. The controller decides how to use the view model
app.service('BlogService',
['$http', '$q', '$sce', 'ViewModelService', function(
  $http, $q, $sce, ViewModelService)
{
    var _this = this;

    _this.fetch = function() {
        var req = {
            method: 'GET',
            url: '/data/blog/blogsummary.json',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: window.timeout
        };
        var response = ViewModelService.createBlogVm();
        return $http(req).then(function(success) {
           
            var i = 0;
            var j = 0;
            for (i = success.data.length-1; i >= 0; i--)
            {
                var b = success.data[i];
                var pvm = ViewModelService.createPostVm();
                pvm.id = b.id;
                pvm.title = b.title;
                pvm.body = $sce.trustAsHtml(b.body);
                pvm.summary = $sce.trustAsHtml(b.summary);
                pvm.author = b.author;
                pvm.publishedDate = new Date(b.publishedDate);
                pvm.friendlyUri = b.friendlyUri;
                pvm.isPublished = b.isPublished;
                pvm.previousPostUri = b.previousPostUri;
                pvm.nextPostUri = b.nextPostUri;
                pvm.tags = b.tags;
                response.posts.push(pvm);
            }
            response.responseCode = success.status;
            response.error = '';
            return response;
        }, function(failure) {
            response = ViewModelService.createBlogVm();
            response.responseCode = failure.status;
            response.error = failure.statusText;
            throw response;
        });
    };

    _this.fetchSingle = function(uri) {
        var req = {
            method: 'GET',
            url: '/data/blog/posts/'+uri+'.json',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: window.timeout
        };
        var response = ViewModelService.createPostVm();
        return $http(req).then(function(success) {
          
            response.id = success.data.id;
            response.title = success.data.title;
            response.body = $sce.trustAsHtml(success.data.body);
            response.summary = $sce.trustAsHtml(success.data.summary);
            response.author = success.data.author;
            response.publishedDate = new Date(success.data.publishedDate);
            response.friendlyUri = success.data.friendlyUri;
            response.isPublished = success.data.isPublished;
            response.responseCode = success.status;
            response.previousPostUri = success.data.previousPostUri;
            response.previousPostTitle = success.data.previousPostTitle;
            response.nextPostUri = success.data.nextPostUri;
            response.nextPostTitle = success.data.nextPostTitle;
            response.tags = success.data.tags;
            response.error = '';
            console.log(JSON.stringify(response));
            return response;
        }, function(failure) {
            response = ViewModelService.createPostVm();
            response.responseCode = failure.status;
            response.error = failure.statusText;
            throw response;
        });
    };
}]);