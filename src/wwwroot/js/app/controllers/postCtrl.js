app.controller('postCtrl', ['$scope', '$routeParams', '$timeout', 'BlogService', 'ViewModelService', 'EncodeStringService', function($scope, $routeParams, $timeout, BlogService, ViewModelService, EncodeStringService) {
    var uri = $routeParams.friendlyUri;
    uri = EncodeStringService.encodeString(uri);
    var postPromise = BlogService.fetchSingle(uri);
    $scope.isLoading = true;
    postPromise.then(
        function (success) {
            $scope.isLoading = false;
            var data = success;
            if (data.responseCode === 200) 
            {
                if (data.isPublished === true) {
                    $scope.postData = data;
                    $timeout(function() {
                        Prism.highlightAll();
                    });
                }
                else
                {
                    // 404? Emtpty
                }
            }
        },
        function (failure) {
            $scope.isLoading = false;
            $scope.error = failure.error;
        }
    );
}]);