app.controller('postCtrl', ['$scope', '$routeParams', 'BlogService', 'ViewModelService', 'EncodeStringService', function($scope, $routeParams, BlogService, ViewModelService, EncodeStringService) {
    var uri = $routeParams.friendlyUri;
    uri = EncodeStringService.encodeString(uri);
    var postPromise = BlogService.fetchSingle(uri);
    postPromise.then(
        function (success) {
           
            var data = success;
            if (data.responseCode === 200) 
            {
                if (data.isPublished === true) {
                    $scope.postData = data;
                    console.log(JSON.stringify($scope.postData));
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