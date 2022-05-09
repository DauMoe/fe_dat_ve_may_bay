'use strict';

angular
    .module('myApp')
    .factory("NewsService", function($http, $rootScope) {
        const HOST  = $rootScope.host;
        const TOKEN = $rootScope.token;

        return {
            GetListNewsAPI: () => {
                return $http.get(HOST + "api/user/flight-news");
            },
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