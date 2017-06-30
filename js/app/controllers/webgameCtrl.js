app.controller('webgameCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.name = 'Webgames';
    $scope.id = $routeParams.gameid;
}]);