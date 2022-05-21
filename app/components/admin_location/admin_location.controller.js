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
    });