'use strict';

angular
    .module('myApp')
    .controller('LoginController', function($scope, $http, $window, $interval, $location, $rootScope) {
        var reqData         = {};
        var host            = $rootScope.host;
        var CatchException  = $rootScope.CatchException;

        // $scope.LoginData = {
        //     email: "phamphilong4101999@gmail.com",
        //     email_err: "",
        //     password: "123",
        //     pass_err: ""
        // };


        $scope.LoginData = {
            email: "",
            email_err: "",
            password: "",
            pass_err: ""
        };

        $scope.Login = function() {
            $scope.LoginData.email_err  = "";
            $scope.LoginData.pass_err   = "";
            if ($scope.LoginData.email.trim() === "") {
                $scope.LoginData.email_err = "Điền email";
                return;
            }
            if ($scope.LoginData.password.trim() === "") {
                $scope.LoginData.pass_err = "Điền mật khẩu";
                return;
            }
            reqData             = {};
            reqData.email       = $scope.LoginData.email;
            reqData.password    = $scope.LoginData.password;

            $http.post($rootScope.host + "api/user/login", reqData)
                .then(function (response) {
                    if (response.data.code === 200) {
                        $rootScope.token        = response.data.result.token;
                        $rootScope.username     = response.data.result.username;
                        $rootScope.role_name    = response.data.result.username === "ROLE_USER" ? "Traveler+" : "Admin";
                        localStorage.setItem("token", response.data.result.token);
                        localStorage.setItem("username", response.data.result.username);
                        localStorage.setItem("role_name", $rootScope.role_name);
                        $location.path("/admin_ticket");
                    } else {
                        $scope.LoginData.email_err = response.data.result;
                    }
                })
                .catch(CatchException);
        };
    });