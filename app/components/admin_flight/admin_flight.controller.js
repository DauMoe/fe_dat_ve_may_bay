'use strict';

//$http     : https://docs.angularjs.org/api/ng/service/$http
//Service   : https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8
//NgTables  : https://embed.plnkr.co/2sBW2L/

angular
    .module('myApp')
    .controller('AdminFlightController', function($q, $scope, $http, $window, $interval, $location, $rootScope, NgTableParams, AdminFlightService, filterFilter) {
        var reqData                 = {};
        const CatchEx               = $rootScope.CatchEx;

        $scope.ListFlightSchedule   = [];
        $scope.FlightSchedule       = null;
        $scope.ListLocation         = [];
        $scope.ListAirplane         = [];
        $scope.SearchInfo   = {
            from_airport    : "",
            to_airport      : "",
            start_date      : "",
            end_date        : ""
        };

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
                            $scope.ListFlightSchedule.push(i);
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

        function GetListFlightSchedule() {
            return AdminFlightService.GetListFlightScheduleAPI();
        }

        function GetListLocation() {
            return AdminFlightService.GetListLocationAPI();
        }

        function GetListAirplane() {
            return AdminFlightService.GetListAirplaneAPI();
        }

        function RandomFlightNo() {
            const PreFlightNo       = ["VN", "INTE", "VJ", "BB", "AG"];
            const FlightNoNumber    = Math.floor(Math.random() * 10000);
            return PreFlightNo[Math.floor(Math.random() * PreFlightNo.length)] + FlightNoNumber + "";
        }

        $scope.AddFlightSchedule = function() {
            $scope.ScheduleInfo = {
                flight_no               : RandomFlightNo(),
                from_airport            : "",
                to_airport              : "",
                airplane                : "",
                start_time              : "",
                end_time                : "",
                first_class_number      : null,
                business_class_number   : null,
                premium_class_number    : null,
                economy_class_number    : null,
            };
            $("#AddScheduleModal").modal('show');
        }

        $scope.CheckTotalSeat = function(num, index) {
            if ($scope.ScheduleInfo.airplane != "") {
                const x = +$scope.ScheduleInfo.airplane.capacity - +$scope.ScheduleInfo.first_class_number - +$scope.ScheduleInfo.business_class_number - +$scope.ScheduleInfo.premium_class_number
                if (x < 0) {
                    const f = num + "";
                    if (index === 1) $scope.ScheduleInfo.first_class_number     = +f.substring(0, f.length - 1);
                    if (index === 2) $scope.ScheduleInfo.business_class_number  = +f.substring(0, f.length - 1);
                    if (index === 3) $scope.ScheduleInfo.premium_class_number   = +f.substring(0, f.length - 1);
                    $window.alert("Tổng số vé hiện tại đang lớn hơn số chỗ có trên máy bay");
                } else {
                    $scope.ScheduleInfo.economy_class_number = x;
                }
            } else {
                $scope.ScheduleInfo = {
                    ...$scope.ScheduleInfo,
                    first_class_number      : 0,
                    business_class_number   : 0,
                    premium_class_number    : 0,
                    economy_class_number    : 0,
                };
            };
        }

        $scope.CreateNewSchedule = function() {
            if ($scope.ScheduleInfo.flight_no == "") {
                $window.alert("Điền số hiệu chuyến bay");
                return;
            }

            if ($scope.ScheduleInfo.from_airport == "") {
                $window.alert("Chọn sân bay khởi hành");
                return;
            }

            if ($scope.ScheduleInfo.to_airport == "") {
                $window.alert("Chọn sân bay tới");
                return;
            }

            if ($scope.ScheduleInfo.airplane == "") {
                $window.alert("Chọn máy bay thực hiện chuyến bay");
                return;
            }

            if ($scope.ScheduleInfo.start_time == "") {
                $window.alert("Chọn thời gian khởi hành");
                return;
            }

            if ($scope.ScheduleInfo.end_time == "") {
                $window.alert("Chọn thời gian kết thúc");
                return;
            }

            if ($scope.ScheduleInfo.first_class_number < 0 || $scope.ScheduleInfo.first_class_number == null) {
                $window.alert("Số ghế phải lớn hơn hoặc bằng 0");
                return;
            }

            if ($scope.ScheduleInfo.business_class_number < 0 || $scope.ScheduleInfo.business_class_number == null) {
                $window.alert("Số ghế phải lớn hơn hoặc bằng 0");
                return;
            }

            if ($scope.ScheduleInfo.premium_class_number < 0 || $scope.ScheduleInfo.premium_class_number == null) {
                $window.alert("Số ghế phải lớn hơn hoặc bằng 0");
                return;
            }

            if ($scope.ScheduleInfo.economy_class_number < 0 || $scope.ScheduleInfo.economy_class_number == null) {
                $window.alert("Số ghế phải lớn hơn hoặc bằng 0");
                return;
            }
            
            reqData                 = {};
            reqData.flight_no       = $scope.ScheduleInfo.flight_no;
            reqData.from_airport_id = $scope.ScheduleInfo.from_airport.location_id;
            reqData.to_airport_id   = $scope.ScheduleInfo.to_airport.location_id;
            reqData.airplane_id     = $scope.ScheduleInfo.airplane.airplane_id;
            reqData.start_time      = moment($scope.ScheduleInfo.start_time).format("DD/MM/YYYY HH:mm");
            reqData.end_time        = moment($scope.ScheduleInfo.end_time).format("DD/MM/YYYY HH:mm");

            $("#loading_md").modal('show');
            AdminFlightService.AddScheduleAPI(reqData)
                .then(r => {
                    if (r.data.code === 200) {
                        reqData                         = {};
                        reqData.flight_schedule_id      = r.data.result.flight_schedule.flight_schedule_id;
                        reqData.first_class_number      = $scope.ScheduleInfo.first_class_number
                        reqData.business_class_number   = $scope.ScheduleInfo.business_class_number
                        reqData.premium_class_number    = $scope.ScheduleInfo.premium_class_number;
                        reqData.economy_class_number    = $scope.ScheduleInfo.economy_class_number;
                        AdminFlightService.CreateTicket4FlightScheduleAPI(reqData)
                            .then(r => {
                                if (r.data.code === 200) {
                                    $("#AddScheduleModal").modal('hide');
                                    init();
                                    $window.alert("Thêm chuyến bay thành công");
                                } else CatchEx(r.data);
                            })
                            .catch(CatchEx)
                            .finally(() => $("#loading_md").modal('hide'));
                    } else CatchEx(r.data);
                })
                .catch(CatchEx);
        }

        $scope.FindFlightScheduleFunc = function() {
            let ListParams = [];
            if ($scope.SearchInfo.from_airport != "") {
                ListParams.push(`from=${$scope.SearchInfo.from_airport.location_id}`);
            }
            if ($scope.SearchInfo.to_airport != "") {
                ListParams.push(`to=${$scope.SearchInfo.to_airport.location_id}`);
            }
            if ($scope.SearchInfo.start_date != "") {
                ListParams.push(`start_time=${$scope.SearchInfo.start_date}`);
            }
            if ($scope.SearchInfo.end_date != "") {
                ListParams.push(`end_time=${$scope.SearchInfo.end_date}`);
            }
            $("#loading_md").modal('show')
            AdminFlightService.SearchFlightScheduleAPI(ListParams.join("&"))
                .then(r => {
                    $scope.ListFlightSchedule = [];
                    if (r.data.code === 200) {
                        $scope.SearchInfo   = {
                            from_airport    : "",
                            to_airport      : "",
                            start_date      : "",
                            end_date        : ""
                        };
                        $scope.ListFlightSchedule   = r.data.result.list;
                        $scope.FlightSchedule       = null;
                    } else if(r.data.code === 400) {
                        $scope.SearchInfo   = {
                            from_airport    : "",
                            to_airport      : "",
                            start_date      : "",
                            end_date        : ""
                        };
                    } else {
                        CatchEx(r.data);
                    }
                })
                .catch(e => {
                    $scope.ListFlightSchedule = [];
                    CatchEx(e);
                })
                .finally(() => $("#loading_md").modal('hide'));
        }
    });