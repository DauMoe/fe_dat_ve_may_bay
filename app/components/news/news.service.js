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
            },
            DeletePostAPI: (post_id) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/admin/flight-news/delete?id=" + post_id);
            },
            CreatePostAPI: (reqData) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http({
                    url: HOST + "api/admin/flight-news/save",
                    method: 'POST',
                    data: reqData,
                    headers: { 
                        'Authorization' : "Bearer " + TOKEN, 
                        'Content-Type'  : undefined
                    }
                });
            }
        };
    });