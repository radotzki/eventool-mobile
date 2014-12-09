(function() {
    'use strict';

    angular
        .module('eventool.controllers')
        .controller('Signup', Signup);

    /* @ngInject */
    function Signup() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Signup';

        activate();

        function activate() {
        }
    }
})();