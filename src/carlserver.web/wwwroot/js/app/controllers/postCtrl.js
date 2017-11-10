app.controller('postCtrl', ['$scope', 'BlogService', function($scope, BlogService) {
    var locationParts = window.location.pathname.split('/');
    var uri = locationParts[locationParts.length-1];
   // alert(uri);
    var postPromise = BlogService.fetchSingle(uri);
    postPromise.then(
        function (success) {
            var data = success;
            if (data.responseCode === 200) 
            {
                if (data.isPublished === true) {
                    $scope.postData = data;
                }
                else
                {
                    // 404? Emtpty
                }
            }
        },
        function (failure) {
            $scope.error = failure.error;
        }
    );
}]);