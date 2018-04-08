app.filter('uriEncodeString',['EncodeStringService', function(EncodeStringService) {
    return function(input) {
        return EncodeStringService.encodeString(input);
    }
}]);