app.controller('blogCtrl', ['$scope', 'BlogService', function($scope, BlogService) {
 
    $scope.blogData = new Array();
    
    var blogPromise = BlogService.fetch();
    blogPromise.then(
        function (success) {
            var data = success;
            var i = 0;
            for (i = 0; i < data.posts.length; i++)
            {
                if (data.posts[i].isPublished === true) {
                    $scope.blogData.push(data.posts[i]);
                }
            }
        },
        function (failure) {
            $scope.error = failure.error;
        }
    );
}]);