(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.production', RepositoryProduction);

	/* @ngInject */
	function RepositoryProduction(Restangular) {
		var base = Restangular.all('productions');

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove
		};
		return service;


		function index() {
			return base.getList();
		};

		function show(id) {
			return base.get(id);
		};

		function create(params) {
			return base.post(params);
		};

		function update(entity) {
			return entity.put();
		};

		function remove(entity) {
			return entity.remove();
		};

	}
})();