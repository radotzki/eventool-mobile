(function() {
    'use strict';

    angular
        .module('eventool.registration')
        .controller('RegisterUser', RegisterUser);

    /* @ngInject */
    function RegisterUser($state, datacontext, $localStorage) {
        /*jshint validthis: true */
        var vm = this;

        vm.user;
        vm.productions;

        vm.register = register;
        vm.back = back;

        activate();

        function activate() {
            getProductions();
        }

        function getProductions() {
            return datacontext.production.index().then(function(resp) {
                vm.productions = resp;
                return resp;
            });
        }

        function register() {
            $localStorage.$reset();
            datacontext.user.create(userAdapter()).then(function() {
                $state.go('login', {
                    msg: 'Your account is locked, call your producer for confirmation.'
                });
            });
        }

        function userAdapter() {
            return {
                production_id: vm.user.production,
                first_name: vm.user.firstName,
                last_name: vm.user.lastName,
                email: vm.user.email,
                password: vm.user.password,
                role: vm.user.role,
                phone: vm.user.phone
            };
        }

        function back() {
            $state.go('login');
        }

    }
})();
