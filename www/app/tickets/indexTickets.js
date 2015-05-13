(function() {
    'use strict';

    angular
        .module('eventool.tickets')
        .controller('IndexTickets', IndexTickets);

    /* @ngInject */
    function IndexTickets($scope, $rootScope, $state, $ionicModal, ticketsPrepSvc, separatorTickets, datacontext) {
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
            }).then(function(modal) {
                ticketModal = modal;
                modal.show();
            });
        }

        function closeModal(ticket) {
            !!ticket && removeTicketFromView(ticket);
            ticketModal.remove();
        }

        function removeTicketFromView(ticket) {
            var deleted = false;
            for (var i = vm.separatedTickets.length - 1; i >= 0 && !deleted; i--) {
                for (var j = vm.separatedTickets[i].tickets.length - 1; j >= 0 && !deleted; j--) {
                    if (vm.separatedTickets[i].tickets[j].id === ticket.id) {
                        deleted = true;
                        vm.separatedTickets[i].tickets.splice(j, 1);
                        if (vm.separatedTickets[i].tickets.length === 0) {
                            vm.separatedTickets.splice(i, 1);
                        }
                    }
                }
            }
        }

        function getTickets(clientId) {
            return datacontext.ticket.index(clientId);
        }

        $scope.$on('ticket-created', function(event, args) {
            getTickets(args.clientId).then(function(resp){
                vm.tickets = resp;
                activate();
            });
        });

    }
})();
