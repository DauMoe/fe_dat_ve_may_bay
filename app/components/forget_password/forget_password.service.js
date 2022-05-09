'use strict';

angular
    .module('myApp')
    .factory("ForgetPasswordService", function($http, $rootScope) {
        return {
            SendForgetPasswordAPI: function (reqData) {
                return $http.post($rootScope.host + "api/user/password-reset-token", reqData);
            }
        };
    });