'use strict';
//$http: https://docs.angularjs.org/api/ng/service/$http
//Service: https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8

angular
    .module('myApp')
    .controller('NotFoundController', function($scope, $http, $window, $interval, $location, $rootScope) {
        (function init() {
            if ($rootScope.token === null) {
                $location.path("/login");
            }
        })();
    });