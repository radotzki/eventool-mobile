(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.eventPrice', RepositoryEventPrice);

	/* @ngInject */
	function RepositoryEventPrice(Restangular) {

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove
		};
		return service;


		function index(eventId) {
			return Restangular.one('events', eventId).getList('prices');
		};

		function show(eventId, priceId) {
			return Restangular.one('events', eventId).one('prices', priceId).get();
		};

		function create(eventId, params) {
			return Restangular.one('events', eventId).post("prices", params);
		};

		function update(entity) {
			return entity.put();
		};

		function remove(entity) {
			return entity.remove();
		};

	}
})();