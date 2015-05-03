(function() {
    'use strict';

    angular
        .module('eventool.cashierMode')
        .controller('CashierClientTicket', CashierClientTicket);

    /* @ngInject */
    function CashierClientTicket($state, $stateParams, $ionicPopup, datacontext, actionSheet) {
        /*jshint validthis: true */
        var vm = this;
        vm.clientId = $stateParams.clientId;
        vm.tickets = [];
        vm.hasArrived = false;

        vm.selectTicket = selectTicket;

        activate();

        function activate() {
            getTickets();
            getClient();
        }

        function getTickets() {
            return datacontext.ticket.currentEvent(vm.clientId).then(function(data) {
                vm.hasArrived = _.find(data, function(ticket) {
                    return ticket && ticket.arrived;
                });

                vm.tickets = vm.hasArrived ? [] : data;

                return data;
            });
        }

        function getClient() {
            return datacontext.client.show(vm.clientId).then(function(data) {
                vm.client = data;
                return data;
            });
        }

        function selectTicket(ticketId) {
            actionSheet.confirm(function() {
                datacontext.ticket.checkin(vm.clientId, ticketId).then(function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'All good',
                        template: 'The ticket registered in the system.'
                    });
                    alertPopup.then(function(res) {
                        $state.go('app.clients.index');
                    });
                }, function(err) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Please try again'
                    });
                    alertPopup.then(function(res) {
                        $state.go('app.clients.index');
                    });
                });
            }, 'Are you sure about this?');

        }

    }
})();
