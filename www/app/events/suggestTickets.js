(function() {
    'use strict';

    angular
        .module('eventool.events')
        .controller('SuggestTickets', SuggestTickets);

    /* @ngInject */
    function SuggestTickets($state, $stateParams, datacontext) {
        /*jshint validthis: true */
        var vm = this;
        vm.clients = [];
        vm.clientClicked = clientClicked;

        activate();

        function activate () {
            getSuggestion();
        }

        function getSuggestion () {
            return datacontext.event.suggestion($stateParams.eventId).then(function (resp){
                vm.clients = resp;
                return vm.clients;
            });
        }

        function clientClicked (clientId) {
            $state.go('app.clients.createTicket' ,{ clientId: clientId });
        }

    }
})();
