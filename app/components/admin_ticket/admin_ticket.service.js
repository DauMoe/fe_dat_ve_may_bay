'use strict';

angular
    .module('myApp')
    .factory("AdminTicketService", function($http, $rootScope) {
        const HOST  = $rootScope.host;
        const TOKEN = $rootScope.token;

        return {
            GetTicketByFlightScheduleAPI: (flight_schedule_id) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/admin/list-ticket?flight_schedule_id=" + flight_schedule_id);
            },
            GetTicketInfoAPI: (ticket_id) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/admin/ticket/" + ticket_id);
            },
            CancelTicketAPI: (ticket_id) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.put(HOST + "api/admin/cancel-ticket?ticket_id=" + ticket_id);
            },
            GetListFlightScheduleAPI: () => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/admin/list-flight");
            }
        };
    });