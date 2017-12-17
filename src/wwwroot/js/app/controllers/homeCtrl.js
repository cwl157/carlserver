app.controller('homeCtrl', ['$scope', 'SettingsService', function($scope, SettingsService) {
    $scope.name = 'Carl';
    $scope.environment = SettingsService.environment();

    console.log($scope.environment);
}]);