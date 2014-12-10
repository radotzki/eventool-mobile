(function() {
	'use strict';

	angular.module('eventool.directives', []);

	angular.module('eventool', [
        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */ 
         'eventool.core',

        /*
         * Feature areas
         */
         'eventool.layout',
         'eventool.session',
         'eventool.clients',
         'eventool.users',
         'eventool.events',
         'eventool.tickets',
         'eventool.friendship',
         'eventool.data',

         'eventool.directives'
         ]);

})();