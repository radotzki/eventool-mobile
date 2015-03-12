(function() {
    'use strict';

    angular
        .module('eventool.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($rootScope, $ionicLoading, auth) {
        /*jshint validthis: true */
        var vm = this;
        vm.canView = canView;

        function canView(what) {
            if (what === 'events') {
                return auth.getUser().user.role !== 'cashier';
            } else if (what === 'workers') {
                return auth.getUser().user.role === 'producer';
            } else {
            	return true;
            }
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $ionicLoading.show();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $ionicLoading.hide();
        });

    }
})();
