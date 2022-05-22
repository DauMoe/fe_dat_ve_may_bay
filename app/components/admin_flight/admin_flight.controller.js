'use strict';

//$http     : https://docs.angularjs.org/api/ng/service/$http
//Service   : https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8
//NgTables  : https://embed.plnkr.co/2sBW2L/

angular
    .module('myApp')
    .controller('AdminFlightController', function($q, $scope, $http, $window, $interval, $location, $rootScope, NgTableParams, AdminFlightService, filterFilter) {
        var reqData                 = {};
        const CatchEx               = $rootScope.CatchEx;
    });