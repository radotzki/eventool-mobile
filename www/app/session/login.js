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
            vm.message = exception.getErrorMsg() || '';
        }

        function login(){
            auth.login(vm.user)
            .then(function(){
                $state.go('app.clients');    
            });
        }

    }
})();