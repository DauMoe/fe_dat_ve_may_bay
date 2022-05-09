'use strict';

angular
    .module('myApp')
    .factory("DashboardService", function($http, $rootScope) {
        const HOST  = $rootScope.host;
        const TOKEN = $rootScope.token;

        return {
            GetListLocationAPI: () => {
                return $http.get(HOST + "api/location");
            },
            SearchFlightAPI: (params) => {
                return $http.get(HOST + "api/flight/search?" + params);
            },
            GetTicketInfoAPI: (ticket_id) => {
                return $http.get(HOST + "api/ticket/" + ticket_id);
            },
            BookTicketAPI: (reqData) => {
                return $http.post(HOST + "book/create", reqData);
            }
        };
    });