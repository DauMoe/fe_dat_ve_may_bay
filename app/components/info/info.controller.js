'use strict';

angular
    .module('myApp')
    .controller('InfoController', function($q, $scope, $http, $window, $interval, $location, $rootScope, InfoService) {
        var reqData             = {};

        const CatchEx           = $rootScope.CatchEx;
        $scope.UserData         = {};

        $scope.SaveUserInfo     = function() {
            reqData             = {};
            reqData.email       = $scope.UserData.email;
            reqData.username    = $scope.UserData.username;
            reqData.phone       = $scope.UserData.phone;
            InfoService.UpdateUserInfoAPI(reqData)
                .then(function(resp) {
                    if (resp.data.code === 200) {
                        init();
                        $window.alert("Cập nhật thành công");
                    } else CatchEx(resp.data);
                })
                .catch(CatchEx);
        };

        init();

        function init() {
            $q.all([GetUserInfo()])
                .then(function (resp) {
                    let HasErr = false;
                    for (let i of resp) {
                        if (i.data.code != 200) {
                            HasErr = true;
                            CatchEx(i.data);
                        }
                    }

                    if (!HasErr) {
                        $scope.UserData = resp[0].data.result;
                    }
                });
        }

        function GetUserInfo() {
            reqData = {};
            return InfoService.GetUserInfoAPI();
        }
    });