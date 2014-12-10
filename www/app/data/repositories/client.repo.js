(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.client', RepositoryClient);

	/* @ngInject */
	function RepositoryClient(Restangular) {
		var base = Restangular.all('clients');

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove,
			search: search,
			inEvent: inEvent
		};
		return service;

		function index() {
			return base.getList();
		}

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

		function search (param) {
			return base.customGETLIST('search', param);
		};

		function inEvent (clientId, eventId) {
			return Restangular.one("clients", clientId).one("in_event", eventId).get();
		};

	}
})();