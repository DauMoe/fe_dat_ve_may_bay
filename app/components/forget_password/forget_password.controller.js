'use strict';

angular
    .module('myApp')
    .controller('ForgetPasswordController', function($q, $scope, $http, $window, $interval, $location, $rootScope, ForgetPasswordService) {
        var reqData             = {};
        const CatchEx           = $rootScope.CatchEx;

        $scope.forget_password_email = "";

        (function init() {
            $scope.forget_password_email = "";
        })();

        $scope.SendResetPasswordEmail = function() {
            if ($scope.forget_password_email === "") {
                $window.alert("Điền email");
                return;
            }
            reqData = {};
            reqData.email = $scope.forget_password_email;
            ForgetPasswordService.SendForgetPasswordAPI(reqData)
                .then(r => {
                    if (r.data.code === 200) {
                        $window.alert("Kiểm tra email!");
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
        }
    });