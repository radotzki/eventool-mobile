(function() {
	'use strict';

	angular
	.module('eventool.core')
	.factory('common', common);

	/* @ngInject */
	function common($q, $rootScope, $timeout) {
		var service = {
			// common angular dependencies
			$broadcast: $broadcast,
			$q: $q,
			$timeout: $timeout
		};
		return service;

		function $broadcast() {
			return $rootScope.$broadcast.apply($rootScope, arguments);
		}

	}
})();