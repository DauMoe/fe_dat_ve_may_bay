'use strict';

//$http: https://docs.angularjs.org/api/ng/service/$http
//Service: https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8

angular
    .module('myApp')
    .controller('NewsController', function($q, $scope, $http, $window, $interval, $location, $rootScope, NewsService, filterFilter) {
        var reqData             = {};

        const CatchEx           = $rootScope.CatchEx; 

        function init() {
            $("#loading_md").modal('show');
            $q.all([GetListNews()])
                .then(function(r) {
                    let HasErr = false;
                    for (let i of r) {
                        if (i.data.code != 200) {
                            HasErr = true;
                            CatchEx(i.data);
                        }
                    }

                    if (!HasErr) {
                        $scope.ListNews = [];
                        for (let i of r[0].data.result) {
                            $scope.ListNews.push({
                                ...i,
                                preview_content : `${i.content.substring(0, 100)} ...`,
                                createdTime     : moment(i.createdTime).format("DD/MM/YYYY HH:mm:ss")
                            });
                        }
                    }
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }

        init();

        function GetListNews() {
            return NewsService.GetListNewsAPI();
        }

        $scope.DetailNews = function(p) {
            $scope.NewsInfo = p;
            $("#DetailNewsModal").modal('show');
        }
    });