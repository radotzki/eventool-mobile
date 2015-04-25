(function() {
    'use strict';

    angular
        .module('eventool.events')
        .controller('SuggestTickets', SuggestTickets);

    /* @ngInject */
    function SuggestTickets($rootScope, $stateParams, $ionicModal, datacontext) {
        /*jshint validthis: true */
        var vm = this;
        var ticketModal;
        vm.clients = [];
        vm.clientClicked = clientClicked;

        activate();

        function activate() {
            getSuggestion();
        }

        function getSuggestion() {
            return datacontext.event.suggestion($stateParams.eventId).then(function(resp) {
                vm.clients = resp;
                return vm.clients;
            });
        }

        function clientClicked(clientId) {
            var modalScope = $rootScope.$new();
            modalScope.clientId = clientId;
            modalScope.closeModal = closeModal;

            $ionicModal.fromTemplateUrl('app/tickets/createTicket.html', {
                animation: 'slide-in-up',
                scope: modalScope
            }).then(function(modal) {
                ticketModal = modal;
                modal.show();
            });
        }

        function closeModal(clientId) {
            ticketModal.remove();
            _.remove(vm.clients, function(client) {
                return client.id === clientId;
            });
        }

    }
})();
