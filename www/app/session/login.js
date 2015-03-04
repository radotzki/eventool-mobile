(function() {
    'use strict';

    angular
        .module('eventool.session')
        .controller('Login', Login);

    /* @ngInject */
    function Login($state, $stateParams, auth, exception) {
        /*jshint validthis: true */
        var vm = this;

        vm.message = '';
        vm.login = login;

        activate();

        function activate() {
            vm.message = exception.getErrorMsg() || $stateParams.msg || '';
        }

        function login() {
            auth.login(vm.user).then(function(resp) {
                if (resp.user.role === 'cashier') {
                    $state.go('app.cashier.index');
                } else {
                    $state.go('app.clients.index');
                }
            });
        }

    }
})();
