(function() {
    'use strict';

    angular
        .module('eventool.cashierMode')
        .config(stateConfig);

    /* @ngInject */
    function stateConfig($stateProvider) {
        $stateProvider

            .state('app.cashier', {
                abstract: true,
                url: "/cashier/clients",
                views: {
                    'tab-clients': {
                        template: '<ion-nav-view></ion-nav-view>'
                    }
                },
                resolve: {
                    user: ['auth', function(auth) {
                        return auth.stateAuth(['producer', 'promoter', 'cashier']);
                    }]
                }
            })
            .state('app.cashier.client-ticket', {
                url: "/:clientId",
                controller: "CashierClientTicket as vm",
                templateUrl: "app/cashierMode/clientTicket.html"
            });

    }

})();
