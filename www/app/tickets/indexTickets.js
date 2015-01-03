(function () {
    'use strict';

    angular
        .module('eventool.tickets')
        .controller('IndexTickets', IndexTickets);

    /* @ngInject */
    function IndexTickets($rootScope, $state, $ionicModal, ticketsPrepSvc, separatorTickets) {
        /*jshint validthis: true */
        var vm = this;

        var tickets = ticketsPrepSvc;
        var ticketModal;
        vm.target = $state.current.data.target;
        vm.separatedTickets = [];
        vm.separatorOrderBy;

        vm.showTicket = showTicket;

        activate();

        function activate() {
            if (vm.target == 'user') {
                vm.separatorOrderBy = '-when';
                vm.separatedTickets = separatorTickets.separateForUser(tickets);
            } else if (vm.target == 'client') {
                vm.separatorOrderBy = '-when';
                vm.separatedTickets = separatorTickets.separateForClient(tickets);
            } else if (vm.target == 'event') {
                vm.separatorOrderBy = 'separatorName';
                vm.separatedTickets = separatorTickets.separateForEvent(tickets);
            }
        }

        function showTicket(clientId, ticketId) {
            var modalScope = $rootScope.$new();
            modalScope.clientId = clientId;
            modalScope.ticketId = ticketId;
            modalScope.closeModal = closeModal;

            $ionicModal.fromTemplateUrl('app/tickets/showTicket.html', {
                animation: 'slide-in-up',
                scope: modalScope
            }).then(function (modal) {
                ticketModal = modal;
                modal.show();
            });
        }

        function closeModal(ticket) {
            !!ticket && removeTicketFromView(ticket);
            ticketModal.remove();
        }

        function removeTicketFromView(ticket) {
            var eventTickets = vm.separatedTickets[findEventByName(ticket.event.name)].tickets;
            for (var i = eventTickets.length - 1; i >= 0; i--) {
                if (eventTickets[i].id == ticket.id) {
                    eventTickets.splice(i, 1);
                }
            };
        }

    }
})();
