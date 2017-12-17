app.directive('clsvrAds', function() {
    return {
        restrict: 'E',
        scope: {
            adType: '='
          },
        templateUrl: '/templates/directives/ads.html',
        controller: function($scope, $attrs, SettingsService) {
           $scope.environment = SettingsService.environment();
           $scope.adToShow = $attrs.adType;
           console.log("From directive: "+$scope.environment);
           console.log($attrs.adType);
          }
    }
});