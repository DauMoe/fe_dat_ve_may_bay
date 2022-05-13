'use strict';

//$http: https://docs.angularjs.org/api/ng/service/$http
//Service: https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8

angular
    .module('myApp')
    .controller('DashboardController', function($q, $scope, $http, $window, $interval, $location, $rootScope, DashboardService, filterFilter) {
        var reqData             = {};

        const CatchEx           = $rootScope.CatchEx;       
        $scope.LocationFrom     = null;
        $scope.LocationTo       = null;
        // $scope.date_from        = moment().format("DD/MM/YYYY");
        $scope.date_from        = "08/03/2022";
        $scope.date_to          = null;
        $scope.ListLocation     = [];
      
        $(document).ready(function() {
            $('.datepicker').datepicker({
                format: 'dd/mm/yyyy',
                // startDate: '-3d'
            });
        });

        init();

        function init() {
            $("#loading_md").modal('show');
            $q.all([GetListLocation()])
                .then(function(r) {
                    let HasErr = false;
                    for (let i of r) {
                        if (i.data.code != 200) {
                            HasErr = true;
                            CatchEx(i.data);
                        }
                    }

                    if (!HasErr) {
                        $scope.ListLocation = [];
                        for (let i of r[0].data.result.list) {
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

        function GetListLocation() {
            return DashboardService.GetListLocationAPI();
        }

        $scope.RemoveGoBackDate = function() {
            $scope.date_to = null;
        }

        $scope.GetDetail = function(p, index, pre) {
            if (p.detail == null) {
                $("#loading_md").modal('show');
                DashboardService.GetTicketInfoAPI(p.ticket_id)
                    .then(function(r) {
                        if (r.data.code === 200) {
                            p.detail = r.data.result;
                            $(`#${pre}${index}`).collapse()
                        } else CatchEx(r.data);
                    })
                    .catch(CatchEx)
                    .finally(() => $("#loading_md").modal('hide'));
            } else {
                console.log(p);
            }
        }

        $scope.OrderTicket = function(p, isGoBack = false) {
            $scope.SelectedFlight = {};
            if (!isGoBack || p != null) {
                $scope.SelectedFlight               = JSON.parse(JSON.stringify(p));
                $scope.SelectedFlight.name          = '';
                $scope.SelectedFlight.phone         = '';
                $scope.SelectedFlight.email         = '';
            } else {
                $scope.SelectedFlight.name          = '';
                $scope.SelectedFlight.phone         = '';
                $scope.SelectedFlight.email         = '';
                $scope.SelectedFlight.ToTicket      = null;
                $scope.SelectedFlight.FromTicket    = null;
            }
            $("#BookingTicketModal").modal('show');
        }

        $scope.BookTicket = function() {
            if ($scope.SelectedFlight.name == "") {
                $window.alert("Điền tên hành khách!");
                return;
            }

            if ($scope.SelectedFlight.phone == "") {
                $window.alert("Điền số điện thoại!");
                return;
            }

            if ($scope.SelectedFlight.email == "") {
                $window.alert("Điền email!");
                return;
            }

            if ($scope.TicketFrom.length > 0 && $scope.TicketTo.length > 0) {
                if ($scope.SelectedFlight.ToTicket == null || $scope.SelectedFlight.FromTicket == null) {
                    $window.alert("Chọn vé chiều đi và về!");
                    return;
                }
            }
            reqData                 = {};
            reqData.namePassenger   = $scope.SelectedFlight.name;
            reqData.phoneNumber     = $scope.SelectedFlight.phone;
            reqData.email           = $scope.SelectedFlight.email;
            reqData.ticketIdTo      = $scope.SelectedFlight.ticket_id;
            if ($scope.SelectedFlight.FromTicket !== null && $scope.SelectedFlight.ToTicket !== null) {
                reqData.ticketIdBack    = $scope.SelectedFlight.ToTicket.ticket_id;
                reqData.ticketIdTo      = $scope.SelectedFlight.FromTicket.ticket_id;
            }
            $("#loading_md").modal('show');
            DashboardService.BookTicketAPI(reqData)
                .then(function(r) {
                    if (r.data.code === 200) {
                        $("#BookingTickerModal").modal('hide');
                        $window.alert("Thành công");
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }

        $scope.CheckToTicket = function() {
            if (moment($scope.SelectedFlight.ToTicket, "HH:mm").valueOf() > moment($scope.SelectedFlight.FromTicket, "HH:mm").valueOf()) {
                $window.alert("Giờ vé đi phải lớn hơn giờ về vé khứ hồi!");
                return;
            }
        }

        $scope.SearchTicket = function() {
            console.log($scope.LocationFrom);
            if ($scope.LocationFrom === '') {
                $window.alert("Chọn địa điểm đi");
                return;
            }

            if ($scope.LocationTo === '') {
                $window.alert("Chọn địa điểm đến");
                return;
            }

            if (JSON.stringify($scope.LocationFrom) == JSON.stringify($scope.LocationTo)) {
                $window.alert("Điểm đi phải khác điểm đến");
                return;
            }

            if ($scope.date_from === null) {
                $window.alert("Chọn ngày đi");
                return;
            }

            if ($scope.date_to !== null && moment($scope.date_from, "DD/MM/YYYY").valueOf() > moment($scope.date_to, "DD/MM/YYYY").valueOf()) {
                $window.alert("Ngày đi phải nhỏ hơn ngày về");
                return;
            }

            const ListParams = [
                `from_airport=${$scope.LocationFrom.location_id}`,
                `to_airport=${$scope.LocationTo.location_id}`,
                `start_time=${moment($scope.date_from, "DD/MM/YYYY").format("YYYY-MM-DD")}`
            ];
            if ($scope.date_to !== null) {
                ListParams.push(`end_time=${moment($scope.date_to, "DD/MM/YYYY").format("YYYY-MM-DD")}`)
            }
            $("#loading_md").modal('show');
            DashboardService.SearchFlightAPI(ListParams.join("&"))
                .then(function(r) {
                    if (r.data.code == 200) {
                        $scope.TicketFrom   = [];
                        $scope.TicketTo     = [];
                        if ($scope.date_to === null) {
                            $scope.TicketFrom   = r.data.result.list;
                        } else {
                            for (let i of r.data.result.fromList) {
                                $scope.TicketTo.push({
                                    ...i,
                                    display: `${i.brand} ${i.flight_no} (${i.start_time} - ${i.end_time})`
                                });
                            }

                            for (let i of r.data.result.toList) {
                                $scope.TicketFrom.push({
                                    ...i,
                                    display: `${i.brand} ${i.flight_no} (${i.start_time} - ${i.end_time})`
                                });
                            }
                        }
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        };
    });