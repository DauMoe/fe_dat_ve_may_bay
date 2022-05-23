'use strict';

//$http     : https://docs.angularjs.org/api/ng/service/$http
//Service   : https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8
//NgTables  : https://embed.plnkr.co/2sBW2L/
//Datetime picker: https://www.npmjs.com/package/angularjs-bootstrap-datetimepicker

angular
    .module('myApp')
    .controller('AdminTicketController', function($q, $scope, $http, $window, $interval, $location, $rootScope, NgTableParams, AdminTicketService, filterFilter) {
        var reqData                 = {};
        const CatchEx               = $rootScope.CatchEx;

        $scope.ListFlightSchedule   = [];
        $scope.FlightSchedule       = null;
        $scope.ListLocation         = [];
        $scope.ListAirplane         = [];

        // $(document).on('focus', ".datepicker_recurring_start", function() {
        //     ComponentsDateTimePickers.init();
        //     $(this).datepicker();
        // });

        // $(document).on('focus', ".timepicker", function() {
        //     ComponentsDateTimePickers.init();
        // });

        function init() {
            $("#loading_md").modal('show');
            $q.all([GetListFlightSchedule(), GetListLocation(), GetListAirplane()])
                .then(r => {
                    let HasErr = false;
                    for (let i of r) {
                        if (i.data.code != 200) {
                            HasErr = true;
                            CatchEx(i.data);
                        }
                    }

                    if (!HasErr) {
                        $scope.ListFlightSchedule   = [];
                        $scope.ListLocation         = [];
                        $scope.ListAirplane         = r[2].data.result.list;
                        for (let i of r[0].data.result.list) {
                            $scope.ListFlightSchedule.push({
                                flight_schedule_id: i.flightId,
                                flight_name: `${i.flight_no} (${i.from_airport.city}-${i.to_airport.city})`
                            });
                        }
                        $scope.FlightSchedule = null;

                        for (let i of r[1].data.result.list) {
                            for (let j of i.cities) {
                                $scope.ListLocation.push({
                                    location_id: j.location_id,
                                    location_name: `${j.city_name} (${i.country_name})`
                                });
                            }
                        }
                    }
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }

        init();

        $scope.GetListTicket = fnGetListTicket;

        function GetListFlightSchedule() {
            return AdminTicketService.GetListFlightScheduleAPI();
        }

        function GetListLocation() {
            return AdminTicketService.GetListLocationAPI();
        }

        function GetListAirplane() {
            return AdminTicketService.GetListAirplaneAPI();
        }

        function fnGetListTicket() {
            if ($scope.FlightSchedule == "") return;
            $("#loading_md").modal('show');
            AdminTicketService.GetTicketByFlightScheduleAPI($scope.FlightSchedule.flight_schedule_id)
                .then(function(r) {
                    if (r.data.code === 200) {
                        $scope.ListTicketByScheduleParams = new NgTableParams({}, { dataset: r.data.result.list});
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }

        $scope.GetDetailTicket = function(p) {
            $("#loading_md").modal('show');
            AdminTicketService.GetTicketInfoAPI(p.ticket_id)
                .then(r => {
                    if (r.data.code === 200) {
                        $scope.TicketInfo = r.data.result;
                        $("#DetailTicketModal").modal('show');
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }

        $scope.CancelTicket = function(p) {
            const confirmCancel = $window.confirm("Bạn có chắc chắn muốn huỷ vé?");
            if (confirmCancel) {
                $("#loading_md").modal('show');
                AdminTicketService.CancelTicketAPI(p.ticket_id)
                    .then(r => {
                        if (r.data.code === 200) {
                            fnGetListTicket();
                            $window.alert("Thành công");
                        } else CatchEx(r.data);
                    })
                    .catch(CatchEx)
                    .finally(() => $("#loading_md").modal('hide'));
            }
        }

        $scope.EditTicketInfo = function(p) {
            if (p.booking_state !== 'BOOKED') {
                $window.alert("Vé không thể chỉnh sửa do chưa được đặt!");
            } else {
                $scope.TicketEditInfo = JSON.parse(JSON.stringify(p));
                console.log($scope.TicketEditInfo);
                $("#EditTicketModal").modal('show');   
            }
        }

        $scope.AddFlightSchedule = function() {
            $scope.ScheduleInfo = {
                flight_no   : "",
                from_airport: "",
                to_airport  : "",
                airplane    : "",
                start_time  : "",
                end_time    : ""
            };
            $("#AddScheduleModal").modal('show');
        }
        $("#AddScheduleModal").modal('show');
        $scope.CreateNewSchedule = function() {
            console.log($scope.ScheduleInfo);
        }
    });