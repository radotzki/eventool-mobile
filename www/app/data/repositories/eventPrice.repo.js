(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.eventPrice', RepositoryEventPrice);

	/* @ngInject */
	function RepositoryEventPrice(Restangular, AbstractRepository) {
		var abstract = AbstractRepository;

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove
		};
		return service;


		function index(eventId) {
			return Restangular.one('events', eventId).getList('prices').then(abstract.querySucceed, abstract.queryFailed);
		};

		function show(eventId, priceId) {
			return Restangular.one('events', eventId).one('prices', priceId).get().then(abstract.querySucceed, abstract.queryFailed);
		};

		function create(eventId, params) {
			return Restangular.one('events', eventId).post("prices", params).then(abstract.querySucceed, abstract.queryFailed);
		};

		function update(entity) {
			return entity.put().then(abstract.querySucceed, abstract.queryFailed);
		};

		function remove(entity) {
			return entity.remove().then(abstract.querySucceed, abstract.queryFailed);
		};

	}
})();