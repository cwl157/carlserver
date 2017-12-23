var app = angular.module('carlServer', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider
        .when('/', {
                templateUrl: '/templates/home.html',
        })
        .when('/about', {
           templateUrl: '/templates/about.html' })
        .when('/blog', {
           templateUrl: '/templates/blog.html'})
        .when('/blog/post/:friendlyUri', {
           templateUrl: '/templates/post.html'
        })
        .when('/disclaimer', {
                templateUrl: '/templates/disclaimer.html'
        })
        .otherwise('/');
 $locationProvider.html5Mode(true); 
}]);



