(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.user', RepositoryUser);

	/* @ngInject */
	function RepositoryUser(Restangular) {
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
			return entity.getList('tickets')
		};

		function unlock (entity) {
			return entity.customPUT({}, "unlock");
		};

		function lock (entity) {
			return entity.customPUT({}, "lock");
		};	

		function changeRole (entity, role) {
			return entity.customPUT({}, "change_role", {role: role});
		};

	}
})();