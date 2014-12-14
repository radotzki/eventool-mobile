(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.user', RepositoryUser);

	/* @ngInject */
	function RepositoryUser(Restangular, AbstractRepository) {
		var abstract = AbstractRepository;
		var base = Restangular.all('users');

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove,
			getTickets: getTickets,
			unlock: unlock,
			lock: lock,
			changeRole: changeRole
		};
		return service;


		function index() {
			return base.getList()
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function show(id) {
			return base.get(id)
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function create(params) {
			return base.post(params)
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function update(entity) {
			return entity.put()
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function remove(entity) {
			return entity.remove()
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function getTickets (entity) {
			return entity.getList('tickets')
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function unlock (entity) {
			return entity.customPUT({}, "unlock")
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function lock (entity) {
			return entity.customPUT({}, "lock")
			.then(abstract.querySucceed, abstract.queryFailed);
		}

		function changeRole (entity, role) {
			return entity.customPUT({}, "change_role", {role: role})
			.then(abstract.querySucceed, abstract.queryFailed);
		}

	}
})();