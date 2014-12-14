(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.client', RepositoryClient);

	/* @ngInject */
	function RepositoryClient(Restangular, AbstractRepository) {
		var base = Restangular.all('clients');
		var abstract = AbstractRepository;

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
			return base.getList().then(abstract.querySucceed, abstract.queryFailed);
		}

		function show(id) {
			return base.get(id).then(abstract.querySucceed, abstract.queryFailed);
		}

		function create(params) {
			return base.post(params).then(abstract.querySucceed, abstract.queryFailed);
		}

		function update(entity) {
			return entity.put().then(abstract.querySucceed, abstract.queryFailed);
		}

		function remove(entity) {
			return entity.remove().then(abstract.querySucceed, abstract.queryFailed);
		}	

		function search (param) {
			return base.customGETLIST('search', param).then(abstract.querySucceed, abstract.queryFailed);
		}

		function inEvent (clientId, eventId) {
			return Restangular.one("clients", clientId).one("in_event", eventId).get().then(abstract.querySucceed, abstract.queryFailed);
		}

	}
})();