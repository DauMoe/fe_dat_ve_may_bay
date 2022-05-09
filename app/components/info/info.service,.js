'use strict';

angular
    .module('myApp')
    .factory("InfoService", function($http, $rootScope) {
        return {
            GetUserInfoAPI: function () {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.token;
                return $http.get($rootScope.host + "api/account");
            },
            UpdateUserInfoAPI: function (reqData) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.token;
                return $http.post($rootScope.host + "api/account/update-info", reqData);
            }
        };
    });