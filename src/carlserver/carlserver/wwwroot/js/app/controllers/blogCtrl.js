app.controller('blogCtrl', ['$scope', '$routeParams', 'BlogService', function($scope, $routeParams, BlogService) {
 
    $scope.blogData = new Array();
    $scope.isLoading = true;
    $scope.selectedTag = $routeParams.tag;
    var blogPromise = BlogService.fetch();
    blogPromise.then(
        function (success) {
            $scope.isLoading = false;
            var data = success;
            var i = 0;
            $scope.tags = [];
            for (i = 0; i < data.posts.length; i++)
            {
                if (data.posts[i].isPublished === true) {
                    if ($scope.selectedTag !== undefined) {
                        if (data.posts[i].tags.indexOf($scope.selectedTag) !== -1) {
                            $scope.blogData.push(data.posts[i]);
                        }
                    } else {
                        $scope.blogData.push(data.posts[i]);
                    }
                    
                    for (s in data.posts[i].tags) {
                        if ($scope.tags.indexOf(data.posts[i].tags[s]) === -1) {
                            $scope.tags.push(data.posts[i].tags[s]);
                        }
                    }
                }
            }  
        },
        function (failure) {
            $scope.isLoading = false;
            $scope.error = failure.error;
        }
    );

    $scope.createPostUrl = function (friendlyUri) {
        // /blog/tags/:tag/post/:friendlyUri
        // /blog/post/'+post.friendlyUri
        var url = '';
        if ($scope.selectedTag) {
            url = '/blog/tags/' + $scope.selectedTag + '/post/' + friendlyUri;
        } else {
            url = '/blog/post/' + friendlyUri;
        }

        return url;
    };
}]);