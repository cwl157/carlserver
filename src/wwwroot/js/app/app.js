var app = angular.module('carlServer', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider
        .when('/', {
                templateUrl: '/templates/home.html',
                controller: 'homeCtrl'
        })
        .when('/webgames/:gameid', {
           templateUrl: '/templates/webgame.html',
           controller: 'webgameCtrl'})
        .when('/about', {
           templateUrl: '/templates/about.html' })
        .when('/blog', {
           templateUrl: '/templates/blog.html'})
        .when('/blog/post/:friendlyUri', {
           templateUrl: '/templates/post.html'
        });
 $locationProvider.html5Mode(true); 
}]);

app.loadedGames = [];
app.didLoad = false;





