'use strict';
//$http: https://docs.angularjs.org/api/ng/service/$http
//Service: https://viblo.asia/p/cach-su-dung-service-trong-angularjs-aRBvXnNweWE#_222-dung-service-method-8

angular
    .module('myApp')
    .controller('TicketController', function($q, $scope, $http, $window, $interval, $location, $rootScope, TicketService) {
        var reqData             = {};

        const CatchEx           = $rootScope.CatchEx;
        const DETAIL_TICKET_MODAL = document.getElementById("detail_ticket");

        (function init() {
            $q.all([GetListTicket()])
                .then(r => {
                    $scope.ListTicket = [];
                    for (let i of r[0].data.result.list) {
                        if (i.bookingState === 'BOOKED') {
                            i.state = 1;
                        } else {
                            i.state = 0;
                        }
                        $scope.ListTicket.push(i);
                    }
                    console.log($scope.ListTicket);
                })
        })();

        function GetListTicket(filter = null) {
            return TicketService.GetListTicketAPI(filter)
        }

        function CloseModal(ModalID) {
            if (ModalID === undefined) return;
            const ModalElement      = document.getElementById(ModalID);
            let className           = ModalElement.className;
            let index               = className.indexOf("open_modal");
            ModalElement.className  = className.substring(0, index - 1);
        }

        $scope.CloseModal = CloseModal

        $scope.CancelTicket = function() {
            const result = $window.confirm("Bạn chắc chắn muốn huỷ vé?");
            if (result) {
                TicketService.CancelTicketAPI($scope.TicketDetail.ticket_id)
                    .then(function(response) {
                        if (response.data.code === 200) {
                            $q.all([GetListTicket()])
                                .then(r => {
                                    $scope.ListTicket = [];
                                    for (let i of r[0].data.result.list) {
                                        if (i.bookingState === 'BOOKED') {
                                            i.state = 1;
                                        } else {
                                            i.state = 0;
                                        }
                                        $scope.ListTicket.push(i);
                                    }
                                });
                            CloseModal('detail_ticket');
                            $window.alert(response.data.result);
                        } else CatchEx(response.data);
                    })
                    .catch(CatchEx);
            }
        }

        $scope.DetailTicket = function(p) {
            TicketService.GetTicketDetailAPI(p.ticketId)
                .then(function(response) {
                    if (response.data.code === 200) {
                        $scope.TicketDetail = response.data.result;
                        let className       = DETAIL_TICKET_MODAL.className || "";
                        if  (!className.includes("open_modal")) className += " open_modal";
                        DETAIL_TICKET_MODAL.className = className;
                    } else CatchEx(response.data);
                })
                .catch(CatchEx);
        }
    });