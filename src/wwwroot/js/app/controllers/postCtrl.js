app.controller('postCtrl', ['$scope', 'BlogService', 'ViewModelService', function($scope, BlogService, ViewModelService) {
  
    var locationParts = window.location.pathname.split('/');
    var uri = locationParts[locationParts.length-1];
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