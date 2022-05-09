'use strict';

angular
    .module('myApp')
    .factory("TicketService", function($http, $rootScope) {
        return {
            GetListTicketAPI: function (filter = null) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.token;
                if (filter === 0) {
                    return $http.get($rootScope.host + "api/ticket?filter=CANCELED");
                } else if (filter === 1) {
                    return $http.get($rootScope.host + "api/ticket?filter=BOOKED");
                } else {
                    return $http.get($rootScope.host + "api/ticket");
                }
            },
            GetTicketDetailAPI: function(TicketID) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.token;
                return $http.get($rootScope.host + "api/ticket/" + TicketID);
            },
            CancelTicketAPI: function(TicketID) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.token;
                return $http.put($rootScope.host + "book/cancel?ticket_id=" + TicketID);
            }
        };
    });