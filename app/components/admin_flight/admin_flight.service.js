'use strict';

angular
    .module('myApp')
    .factory("AdminFlightService", function($http, $rootScope) {
        const HOST  = $rootScope.host;
        const TOKEN = $rootScope.token;

        return {
            GetListLocationAPI: () => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/location");
            },
            DeleteLocationAPI: (location_id) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.delete(HOST + "api/admin/location-delete/" + location_id);
            },
            AddLocationAPI: (reqData) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.post(HOST + "api/admin/location-add", reqData);
            }
        };
    });