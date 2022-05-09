'use strict';

// Declare app level module which depends on views, and core components

angular
    .module('myApp', [
      'ngRoute',
      'angularCSS',
      'DropDownSelect'
    ])
    .run(function($rootScope, $window, $location) {
        $rootScope.host         = "http://localhost:8080/";

        $rootScope.CatchEx      = function(e) {
            if (e.hasOwnProperty("code")) {
                if (e.code !== 200) {
                    $window.alert(e.description);
                }
            } else {
                $window.alert(e.message);
            }
        };

        $rootScope.SignOut = function() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role_name");
            $location.path("#!/login");
        };
    })
    .config(function($locationProvider, $routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl : 'components/dashboard/dashboard.html',
                controller  : 'DashboardController',
                css         : 'components/dashboard/dashboard.css'
            })
            .when('/news', {
                templateUrl : 'components/news/news.html',
                controller  : 'NewsController',
                css         : 'components/news/news.css'
            })
            .when('/login', {
                templateUrl : 'components/login/login.html',
                controller  : 'LoginController',
                css         : 'components/login/login.css'
            })
            .otherwise({ redirectTo: '/news' });
    });
