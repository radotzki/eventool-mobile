(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('AbstractRepository', AbstractRepository);

	/* @ngInject */
	function AbstractRepository(exception) {
		var service = {
			querySucceed: querySucceed,
			queryFailed: queryFailed
		};
		return service;

		function queryFailed(error) {
			exception.xhrCatcher('Error retrieving data.', error);
		};

		function querySucceed(resp) {
			return resp;
		};

	}
})();