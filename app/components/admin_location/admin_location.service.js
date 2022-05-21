'use strict';

angular
    .module('myApp')
    .factory("AdminLocationService", function($http, $rootScope) {
        const HOST  = $rootScope.host;
        const TOKEN = $rootScope.token;

        return {
            GetListLocationAPI: () => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/location");
            }
        };
    });