app.controller('blogCtrl', ['$scope', 'BlogService', function($scope, BlogService) {
    $scope.blogData = new Array();
    var blogPromise = BlogService.fetch();
    console.log("After calling fetch");
    blogPromise.then(
        function (success) {
          //  console.log(JSON.stringify(success));
            var data = success;
            if (data.responseCode === 200) 
            {
                var i = 0;
                for (i = 0; i < data.posts.length; i++)
                {
                    $scope.blogData.push(data.posts[i]);
                }

                console.log(JSON.stringify($scope.blogData));
            }
            // TODO: Handle error response codes
           // $scope.apiError = false;
            //$scope.assignments = data;

           // $scope.isLoading = false; // We're no longer loading!
           // $scope.responseComplete = true;
        },
        function (failure) {
          //  $scope.apiError = true;
          //  $scope.isLoading = false;
          //  $scope.responseComplete = true;

            //returning the appropriate error
          //  if (failure.status === 404) {
          //      $scope.errorMessage = 'Sorry, there were no results found for your request.';
          //  } else {
          //      $scope.errorMessage = 'There was an error processing your request! Please try again later!';
          //  }
        }
    );
}]);