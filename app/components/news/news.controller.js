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

        $scope.DeletePost = function(p) {
            const cf = $window.confirm("Chắc chắn xoá bài viết?");
            if (cf) {
                $("#loading_md").modal('show');
                NewsService.DeletePostAPI(p.flightNewsId)
                    .then(r => {
                        if (r.data.code === 200) {
                            init();
                            $window.alert("Xoá thành công");
                        } else CatchEx(r.data);
                    })
                    .catch(CatchEx)
                    .finally(() => $("#loading_md").modal('hide'));   
            }
        }

        $scope.AddPost = AddPost;
        function AddPost() {
            $scope.PostInfo = {
                title       : "",
                content     : "",
                author      : "",
                fileImage   : null,
            }
            angular.element('#uploadThumnail').val(null);
            $("#AddPostModal").modal('show');
        }
        
        $scope.chooseFile = function(e) {
            $scope.PostInfo.fileImage = e.target.files[0];
            if ($scope.PostInfo.fileImage != null) {
                var extension = $scope.PostInfo.fileImage.name.substring($scope.PostInfo.fileImage.name.lastIndexOf('.') + 1);
                if (!(extension == 'png' || extension == 'jpg' || extension == 'jpeg')) {
                    alert('File không đúng định dạng!');
                    $scope.PostInfo.fileImage = null;
                } else {
                    var reader      = new FileReader();
                    reader.onload   = function(event) {
                        $scope.PostInfo.fileImage = e.target.files[0];
                    };
                    reader.onerror = function(ex) {};
                    reader.readAsBinaryString($scope.PostInfo.fileImage);
                }
            }
        }

        $scope.CreatePost = function() {
            if ($scope.PostInfo.tilte == "") {
                $window.alert("Điền tiêu đề");
                return;
            }

            if ($scope.PostInfo.content == "") {
                $window.alert("Hãy viết nội dung gì đó");
                return;
            }

            if ($scope.PostInfo.author == "") {
                $window.alert("Điền tên tác giả");
                return;
            }

            if ($scope.PostInfo.fileImage == null) {
                $window.alert("Chọn một file ảnh");
                return;
            }

            const reqDataFD = new FormData();
            reqDataFD.append("title", $scope.PostInfo.title);
            reqDataFD.append("content", $scope.PostInfo.content);
            reqDataFD.append("author", $scope.PostInfo.author);
            reqDataFD.append("fileImage", $scope.PostInfo.fileImage);
            reqDataFD.append("extraImage", $scope.PostInfo.fileImage);
            $("#loading_md").modal('show')
            NewsService.CreatePostAPI(reqDataFD)
                .then(r => {
                    if (r.data.code === 200) {
                        $("#AddPostModal").modal('hide');
                        init();
                        $window.alert("Thành công");
                    } else CatchEx(r.data);
                })
                .catch(CatchEx)
                .finally(() => $("#loading_md").modal('hide'));
        }
    });