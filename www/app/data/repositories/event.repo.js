(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.event', RepositoryEvent);

	/* @ngInject */
	function RepositoryEvent(Restangular) {
		var base = Restangular.all('events');

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove,
			getTickets: getTickets
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

		function getTickets (entity) {
			return entity.getList('tickets');
		};

	}
})();