var app = angular.module('carlServer', ['ngRoute', 'angular-cookie-law', 'ngMeta']);
//var app = angular.module('carlServer', ['ngRoute', 'ngMeta']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider
        .when('/', {
                templateUrl: '/templates/home.html',
				controller: 'blogCtrl',
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

app.run(['$rootScope', 'ngMeta', 'CookieLawService', 'ScriptLoaderService', function($rootScope, ngMeta, CookieLawService, ScriptLoaderService) { 
        ngMeta.init();

       // alert(CookieLawService.isEnabled());
       // alert(CookieLawService.isAccepted());
       // alert(CookieLawService.isDeclined());

         if (CookieLawService.isEnabled()) {
                 if (CookieLawService.isAccepted()) {
                         ScriptLoaderService.load("/js/vendor/autotrack.js");
                         ScriptLoaderService.load("/js/vendor/ga.js");
                         ScriptLoaderService.load("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
                    //     ScriptLoaderService.load("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
                 }
         }

        // var scriptUrl = "/js/vendor/autotrack.js";
        // var gaScriptUrl = "/js/vendor/ga.js";
        // var scriptEl = document.createElement('script');
        //         scriptEl.onload = function() {
        //             console.log(scriptUrl + " loaded");
        //         };
        //         scriptEl.src = scriptUrl;
        //         document.head.appendChild(scriptEl);
        // var gaScriptEl = document.createElement('script');
        // gaScriptEl.onload = function() {
        //         console.log(gaScriptUrl + " loaded");
        // };
        // gaScriptEl.src = gaScriptUrl;
        // document.head.appendChild(gaScriptEl);
        $rootScope.$on('cookieLaw.decline', function() {
                //window.location.reload();
                //callback function
                //alert("declined");
        });
        $rootScope.$on('cookieLaw.accept', function() {
                ScriptLoaderService.load("/js/vendor/autotrack.js");
                ScriptLoaderService.load("/js/vendor/ga.js");
                ScriptLoaderService.load("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
                //callback function
                //alert("Accepted");
                //window.location.reload();
                // var scriptUrl = "/js/vendor/autotrack.js";
        //var gaScriptUrl = "/js/vendor/ga.js";
        // var scriptEl = document.createElement('script');
        //         scriptEl.onload = function() {
        //             console.log(scriptUrl + " loaded");
        //         };
        //         scriptEl.src = scriptUrl;
        //         document.head.appendChild(scriptEl);
        //var gaScriptEl = document.createElement('script');
        //gaScriptEl.onload = function() {
        //        console.log(gaScriptUrl + " loaded");
        //};
        //gaScriptEl.src = gaScriptUrl;
        //document.head.appendChild(gaScriptEl);
        });
}]);



