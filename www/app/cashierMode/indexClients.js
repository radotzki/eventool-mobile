(function() {
    'use strict';

    angular
        .module('eventool.cashierMode')
        .controller('CashierIndexClients', CashierIndexClients);

    /* @ngInject */
    function CashierIndexClients($state) {
        /*jshint validthis: true */
        var vm = this;

        vm.clientClicked = clientClicked;

        function clientClicked(clientId) {
            // TODO: 
        }

    }
})();
