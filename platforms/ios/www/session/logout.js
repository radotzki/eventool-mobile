(function() {
    'use strict';

    angular
        .module('eventool.controllers')
        .controller('Logout', Logout);

    /* @ngInject */
    function Logout($state, auth) {
        activate();

        function activate() {
        	auth.logout();
        	$state.go('app.login');
        }
    }
})();