//var app = angular.module('carlServer', ['ngRoute', 'angular-cookie-law', 'ngMeta']);
var app = angular.module('carlServer', ['ngRoute', 'ngMeta']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider
        .when('/', {
                templateUrl: '/templates/home.html',
                data: {
                        meta: {
                          'title': 'CarlServer',
                          'description': 'Blog about full stack programming. Topics include angularjs, javascript, csharp, and general programming tutorials, tips, and best practices. Code examples are includes with each blog post.',
                          'keywords': 'angularjs,csharp,programming,web,apps,blog,carlserver'
                        }
                      }
        })
        .when('/about', {
           templateUrl: '/templates/about.html',
        data: {
                meta: {
                        'title':'CarlServer-About',
                        'description':'About Carl Layton. The author of carlserver',
                        'keywords': 'carlserver,about me,carl layton'
                }
        }
        })
        .when('/blog', {
           templateUrl: '/templates/blog.html',
           controller: 'blogCtrl',
           data: {
                meta: {
                        'title':'CarlServer-Blog',
                        'description':'Summaries of blog posts on CarlServer. Topics include angularjs, javascript, csharp, and general programming tutorials, tips, and best practices. Code examples are includes with each blog post.',
                        'keywords': 'angularjs,csharp,blog,tutorials,code examples,programming,carlserver'
                }
        }
        })
    .when('/blog/tags/:tag', {
        templateUrl: '/templates/blog.html',
        controller: 'blogCtrl'
    })
    .when('/blog/post/:friendlyUri', {
           templateUrl: '/templates/post.html',
           controller: 'postCtrl'
    })
    .when('/blog/tags/:tag/post/:friendlyUri', {
        templateUrl: 'templates/post.html',
        controller: 'postCtrl'
    })
        .when('/disclaimer', {
                templateUrl: '/templates/disclaimer.html',
                data: {
                        meta: {
                                'title':'CarlServer-Disclaimer',
                                'description':'Disclaimer for viewers of carlserver'
                        }
                }
        })
        .otherwise('/');
 $locationProvider.html5Mode(true); 
}]);

app.run(['ngMeta', function(ngMeta) { 
        ngMeta.init();
}]);



