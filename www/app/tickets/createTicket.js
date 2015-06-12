(function() {
    'use strict';

    angular
        .module('eventool.tickets')
        .controller('CreateTicket', CreateTicket);

    /* @ngInject */
    function CreateTicket($state, $scope, datacontext) {
        /*jshint validthis: true */
        var vm = this;

        var tickets;
        var clientId = $scope.clientId;

        vm.createTicket = createTicket;
        vm.closeModal = $scope.closeModal;

        activate();

        function activate() {
            getUpcomingEvents();
            getTickets();
        }

        function getUpcomingEvents() {
            return datacontext.event.upcoming().then(function(data) {
                vm.events = data;
                return data;
            });
        }

        function getTickets() {
            return datacontext.ticket.index(clientId).then(function(resp) {
                tickets = resp;
            });
        }

        function createTicket() {
            var param = {
                event_id: vm.selectedEvent.id,
                event_price_id: vm.selectedPrice.id
            };

            datacontext.ticket.create(clientId, param).then(function(res) {
                vm.closeModal(clientId);
            });
        }

    }
})();
