(function() {
    'use strict';

    angular.module('eventool.core', [
        /*
         * Angular modules
         */
        'ionic', 
        /*
         * Our reusable cross app code modules
         */
         'blocks.logger', 'blocks.exception',
        /*
         * 3rd Party modules
         */
        'ui.bootstrap.datetimepicker', 'restangular', 'ngStorage'
    ]);
})();
