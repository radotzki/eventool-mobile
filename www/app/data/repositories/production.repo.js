(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.production', RepositoryProduction);

	/* @ngInject */
	function RepositoryProduction(Restangular, AbstractRepository) {
		var abstract = AbstractRepository;
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
			return base.getList().then(abstract.querySucceed, abstract.queryFailed);
		};

		function show(id) {
			return base.get(id).then(abstract.querySucceed, abstract.queryFailed);
		};

		function create(params) {
			return base.post(params).then(abstract.querySucceed, abstract.queryFailed);
		};

		function update(entity) {
			return entity.put().then(abstract.querySucceed, abstract.queryFailed);
		};

		function remove(entity) {
			return entity.remove().then(abstract.querySucceed, abstract.queryFailed);
		};

	}
})();