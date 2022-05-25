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
        $scope.TicketFrom       = null;
        $scope.TicketTo         = null;
        $scope.date_from        = "08/03/2022";
        $scope.date_to          = "09/03/2022";
        // $scope.date_from        = moment().format("DD/MM/YYYY");
        // $scope.date_to          = null;
        $scope.ListLocation     = [];

        $scope.ListPassengerType= [{
            id: 1,
            name: "Người lớn"
        }, {
            id: 2,
            name: "Trẻ em"
        }, {
            id: 3,
            name: "Trẻ sơ sinh"
        }]
      
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

        $scope.ChangePassengerType = function() {
            // console.log($scope.SelectedFlight);
        }

        $scope.OrderTicket = OrderTicket;
        function OrderTicket(p, isGoBack = false) {
            $scope.SelectedFlight = {};
            if (!isGoBack || p != null) {
                $scope.SelectedFlight               = JSON.parse(JSON.stringify(p));
                $scope.SelectedFlight.name          = '';
                $scope.SelectedFlight.phone         = '';
                $scope.SelectedFlight.email         = '';
                $scope.SelectedFlight.ListPassenger = [{
                    type            : $scope.ListPassengerType[0],
                    num_of_pass     : 1,
                    passenger_name  : ""
                }];
            } else {
                $scope.SelectedFlight.name          = '';
                $scope.SelectedFlight.phone         = '';
                $scope.SelectedFlight.email         = '';
                $scope.SelectedFlight.ToTicket      = '';
                $scope.SelectedFlight.FromTicket    = '';
                $scope.SelectedFlight.ListPassenger = [{
                    type            : $scope.ListPassengerType[0],
                    num_of_pass     : 1,
                    passenger_name  : ""
                }];
            }
            $("#BookingTicketModal").modal('show');
        }

        $scope.RemovePassenger = function(index) {
            if ($scope.SelectedFlight.ListPassenger.length > 1) {
                $scope.SelectedFlight.ListPassenger.splice(index, 1);
            } else {
                $window.alert("Phải có ít nhất một hành khách");
            }
        }

        $scope.AddPassenger = function() {
            $scope.SelectedFlight.ListPassenger.push({
                type            : "",
                num_of_pass     : 1,
                passenger_name  : ""
            });
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

            if ($scope.TicketFrom != null && $scope.TicketTo != null) {
                if ($scope.SelectedFlight.ToTicket == '' || $scope.SelectedFlight.FromTicket == '') {
                    $window.alert("Chọn vé chiều đi và về!");
                    return;
                }
            }

            if ($scope.SelectedFlight.ListPassenger.length == 0) {
                $window.alert("Phải có ít nhất một hành khách!");
                return;
            }

            for (let i of $scope.SelectedFlight.ListPassenger) {
                if (i.type == '') {
                    $window.alert("Vui lòng chọn đầy đủ loại hành khách cho mỗi ghế ngồi!");
                    return;
                }

                if (i.num_of_pass <= 0) {
                    $window.alert("Số lượng hành khách phải lớn hơn 0");
                    return;
                }

                if (i.passenger_name === "") {
                    $window.alert("ĐIền đầy đủ tên người bay");
                    return;
                }
            }

            console.log($scope.SelectedFlight);

            reqData                 = {};
            reqData.namePassenger   = $scope.SelectedFlight.name;
            reqData.phoneNumber     = $scope.SelectedFlight.phone;
            reqData.email           = $scope.SelectedFlight.email;
            if ($scope.TicketFrom != null && $scope.TicketTo != null) {
                reqData.ticketIdBack    = $scope.SelectedFlight.ToTicket.ticketId[0];
                reqData.ticketIdTo      = $scope.SelectedFlight.FromTicket.ticketId[0];
            } else {
                reqData.ticketIdTo      = $scope.SelectedFlight.ticketId[0];
            }
            reqData.totalAdult      = 0;
            reqData.totalChildren   = 0;
            reqData.totalBaby       = 0;

            for (let i of $scope.SelectedFlight.ListPassenger) {
                if (i.type.id === 1) {
                    reqData.totalAdult += i.num_of_pass
                } else if (i.type.id === 2) {
                    reqData.totalChildren += i.num_of_pass
                } else if (i.type.id === 3) {
                    reqData.totalBaby += i.num_of_pass
                }
            }

            $("#loading_md").modal('show');
            DashboardService.BookTicketAPI(reqData)
                .then(function(r) {
                    if (r.data.code === 200) {
                        $("#BookingTicketModal").modal('hide');
                        $window.alert(r.data.result);
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
            $scope.TicketFrom   = null;
            $scope.TicketTo     = null;
            // console.log($scope.LocationFrom);
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
                        if ($scope.date_to === null) {
                            $scope.TicketFrom = [];
                            let ExistedTicket = [];
                            for (let i of r.data.result.list) {
                                const index = ExistedTicket.indexOf(`${i.flightId}-${i.flight_schedule_id}`);
                                if (index === -1) {
                                    ExistedTicket.push(`${i.flightId}-${i.flight_schedule_id}`);
                                    $scope.TicketFrom.push({
                                        ...i,
                                        ticketId: [i.ticket_id]
                                    });
                                } else {
                                    $scope.TicketFrom[index].ticketId.push(i.ticket_id);
                                }
                            }
                        } else {
                            $scope.TicketFrom   = [];
                            $scope.TicketTo     = [];
                            let FromExistedTicket   = [];
                            let ToExistedTicket     = [];
                            for (let i of r.data.result.fromList) {
                                const index = FromExistedTicket.indexOf(`${i.flightId}-${i.flight_schedule_id}`);
                                if (index === -1) {
                                    FromExistedTicket.push(`${i.flightId}-${i.flight_schedule_id}`);
                                    $scope.TicketTo.push({
                                        ...i,
                                        ticketId: [i.ticket_id],
                                        display : `${i.brand} ${i.flight_no} (${i.start_time} - ${i.end_time})`
                                    });
                                } else {
                                    $scope.TicketFrom[index].ticketId.push(i.ticket_id);
                                }
                            }

                            for (let i of r.data.result.toList) {
                                const index = ToExistedTicket.indexOf(`${i.flightId}-${i.flight_schedule_id}`);
                                if (index === -1) {
                                    ToExistedTicket.push(`${i.flightId}-${i.flight_schedule_id}`);
                                    $scope.TicketFrom.push({
                                        ...i,
                                        ticketId: [i.ticket_id],
                                        display : `${i.brand} ${i.flight_no} (${i.start_time} - ${i.end_time})`
                                    });
                                } else {
                                    $scope.TicketFrom[index].ticketId.push(i.ticket_id);
                                }
                            }
                        }
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        };
    });