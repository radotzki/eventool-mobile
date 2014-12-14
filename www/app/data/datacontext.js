(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('datacontext', datacontext);

	/* @ngInject */
	function datacontext($injector) {
		var repoNames = ['client', 'clientComment', 'event',
		 'eventPrice', 'friendship', 'production', 'ticket', 'user'];

		var service = {
			// Repositories will be added by init
		};

		init();
		return service;

		function init() {
			repoNames.forEach(function(name) {
				service[name] = $injector.get('repository.' + name);
			});
		}

	}
})();