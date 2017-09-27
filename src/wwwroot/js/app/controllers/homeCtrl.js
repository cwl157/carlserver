app.controller('homeCtrl', ['$scope', function($scope) {
    $scope.name = 'Carl';

    // var postsData = PostService.fetch();
    // console.log("After calling fetch");
    // postsData.then(
    //     function (success) {
    //         console.log(JSON.stringify(success));
    //         var data = success;

    //        // $scope.apiError = false;
    //         //$scope.assignments = data;

    //        // $scope.isLoading = false; // We're no longer loading!
    //        // $scope.responseComplete = true;
    //     },
    //     function (failure) {
    //       //  $scope.apiError = true;
    //       //  $scope.isLoading = false;
    //       //  $scope.responseComplete = true;

    //         //returning the appropriate error
    //       //  if (failure.status === 404) {
    //       //      $scope.errorMessage = 'Sorry, there were no results found for your request.';
    //       //  } else {
    //       //      $scope.errorMessage = 'There was an error processing your request! Please try again later!';
    //       //  }
    //     }
    // );

}]);