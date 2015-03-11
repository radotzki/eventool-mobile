(function() {
    'use strict';

    angular
        .module('eventool.clients')
        .controller('IndexClients', IndexClients);

    /* @ngInject */
    function IndexClients($state, auth) {
        /*jshint validthis: true */
        var vm = this;
        vm.user = auth.getUser().user;
        vm.clientClicked = clientClicked;

        function clientClicked(clientId) {
            if (vm.user.role === 'cashier') {
                $state.go('app.cashier.client-ticket', {
                    clientId: clientId
                });
            } else {
                $state.go('app.clients.detail.tickets', {
                    clientId: clientId
                });
            }

        }

    }
})();
