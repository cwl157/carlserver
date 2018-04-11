app.controller('postCtrl', ['$scope', '$routeParams', '$timeout', 'ngMeta', 'BlogService', 'ViewModelService', 'EncodeStringService', function($scope, $routeParams, $timeout, ngMeta, BlogService, ViewModelService, EncodeStringService) {
    var uri = $routeParams.friendlyUri;
    uri = EncodeStringService.encodeString(uri);
    var postPromise = BlogService.fetchSingle(uri);
    $scope.isLoading = true;
    $scope.selectedTag = $routeParams.tag;
    postPromise.then(
        function (success) {
            $scope.isLoading = false;
            var data = success;
           // $scope.tags = [];
            if (data.responseCode === 200) 
            {
                if (data.isPublished === true) {
                    $scope.postData = data;
                    ngMeta.setTitle('CarlServer-'+$scope.postData.title);
                    ngMeta.setTag('description', $scope.postData.summary);
                    //ngMeta.setTag('keywords','angularjs,csharp,tutorial,programming,code example');
                    ngMeta.setTag('keywords', $scope.postData.tags.join(','));
                    $timeout(function() {
                        Prism.highlightAll();
                    });
                    $scope.tags = $scope.postData.tags;
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