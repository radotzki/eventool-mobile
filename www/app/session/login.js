(function() {
    'use strict';

    angular
    .module('eventool.session')
    .controller('Login', Login);

    /* @ngInject */
    function Login($state, auth) {
        /*jshint validthis: true */
        var vm = this;
        
        vm.message = '';
        vm.login = login;

        function login(){
            auth.login(vm.user)
            .then(function(){
                $state.go('app.clients');    
            }, function(error){
                vm.message = "Invalid Username or Password.";
            });
        }

    }
})();