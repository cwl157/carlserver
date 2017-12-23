app.controller('blogCtrl', ['$scope', 'BlogService', function($scope, BlogService) {
 
    $scope.blogData = new Array();
    $scope.isLoading = true;

    var blogPromise = BlogService.fetch();
    blogPromise.then(
        function (success) {
            $scope.isLoading = false;
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
            $scope.isLoading = false;
            $scope.error = failure.error;
        }
    );
}]);