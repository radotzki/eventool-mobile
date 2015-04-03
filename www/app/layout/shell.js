(function() {
    'use strict';

    angular
        .module('eventool.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($rootScope, $ionicLoading, auth) {
        /*jshint validthis: true */
        var vm = this;

        vm.user = {};
        vm.logout = logout;

        activate();

        function activate() {
            vm.user = auth.getUser().user;
        }

        function logout () {
            auth.logout();
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $ionicLoading.show();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $ionicLoading.hide();
        });

    }
})();
