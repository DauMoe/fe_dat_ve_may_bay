'use strict';

//$http     : https://docs.angularjs.org/api/ng/service/$http
//Service   : https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8
//NgTables  : https://embed.plnkr.co/2sBW2L/

angular
    .module('myApp')
    .controller('AdminLocationController', function($q, $scope, $http, $window, $interval, $location, $rootScope, NgTableParams, AdminLocationService, filterFilter) {
        var reqData                 = {};
        const CatchEx               = $rootScope.CatchEx;

        $scope.ListLocation         = [];
        $scope.ListClass            = ["success", "danger", "warning"];

        function init() {
            $("#loading_md").modal('show');
            $q.all([GetListLocation()])
                .then(r => {
                    let HasErr = false;
                    for (let i of r) {
                        if (i.data.code != 200) {
                            HasErr = true;
                            CatchEx(i.data);
                        }
                    }

                    if (!HasErr) {
                        $scope.ListLocation = r[0].data.result.list;
                    }
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }

        init();

        function GetListLocation() {
            return AdminLocationService.GetListLocationAPI();
        }

        $scope.DeleteLocation = function(p) {
            const cf = $window.confirm(`Xoá địa điểm ${p.city_name}?`);
            if (cf) {
                $("#loading_md").modal('show');
                AdminLocationService.DeleteLocationAPI(p.location_id)
                    .then(r => {
                        if (r.data.code === 200) {
                            init();
                            $window.alert("Xoá địa điểm thành công");
                        } else CatchEx(r.data);
                    })
                    .catch(CatchEx)
                    .finally(() => $("#loading_md").modal('hide'));
            }
        }

        function UpperEachWord(sentence) {
            const arr = sentence.split(" ");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

            }
            return arr.join(" ");
        }

        $scope.AddLocation = function() {
            $scope.LocationInfo = {
                country_name    : "",
                city_name       : "",
                airport_name    : ""
            }
            $("#AddLocationModal").modal('show');
        }

        $scope.CreateLocation = function() {
            if ($scope.LocationInfo.country_name == "") {
                $window.alert("Điền tên quốc gia");
                return;
            }

            if ($scope.LocationInfo.city_name == "") {
                $window.alert("Điền tên thành phô");
                return;
            }

            if ($scope.LocationInfo.airport_name == "") {
                $window.alert("Điền tên sân bay");
                return;
            }

            reqData                 = {};
            reqData.city_name       = UpperEachWord($scope.LocationInfo.city_name);
            reqData.country_name    = UpperEachWord($scope.LocationInfo.country_name);
            reqData.airport_name    = UpperEachWord($scope.LocationInfo.airport_name);
            $("#loading_md").modal('show');
            AdminLocationService.AddLocationAPI(reqData)
                .then(r => {
                    if (r.data.code === 200) {
                        $("#AddLocationModal").modal('hide');
                        init();
                        $window.alert("Tạo địa điểm thành công");
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }
    });