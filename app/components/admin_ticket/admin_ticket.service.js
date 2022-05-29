'use strict';

angular
    .module('myApp')
    .factory("AdminTicketService", function($http, $rootScope) {
        const HOST  = $rootScope.host;
        const TOKEN = $rootScope.token;

        return {
            AddScheduleAPI: (reqData) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.post(HOST + "api/admin/add-schedule", reqData);
            },
            CreateTicketForFlightScheduleAPI: () => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.post(HOST + "api/admin/ticket/create", reqData);
            },
            GetListAirplaneAPI: () => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/admin/airplane");
            },
            GetListLocationAPI: () => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.get(HOST + "api/location");
            },
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
                return $http.get(HOST + "api/admin/list-flight-schedule");
            },
            CreateTicket4FlightScheduleAPI: (reqData) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.post(HOST + "api/admin/ticket/create", reqData);
            },
            ConfirmTicketAPI:(ticket_id) => {
                $http.defaults.headers.common['Authorization'] = "Bearer " + TOKEN;
                return $http.post(HOST + "api/admin/confirm-ticket?ticket_id=" + ticket_id);
            }
        };
    });