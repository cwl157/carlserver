app.controller('homeCtrl', ['$scope', function($scope) {
    $scope.name = 'Carl';


    console.log("environment = " + $scope.environment);
}]);