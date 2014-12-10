(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.clientComment', RepositoryClientComment);

	/* @ngInject */
	function RepositoryClientComment(Restangular) {
		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove
		};
		return service;


		function index(clientId) {
			return Restangular.one('clients', clientId).getList('comments');
		};

		function show(clientId, commentId) {
			return Restangular.one('clients', clientId).one('comments', commentId).get();
		};

		function create(clientId, params) {
			return Restangular.one('clients', clientId).post("comments", params);
		};

		function update(entity) {
			return entity.put();
		};

		function remove(entity) {
			return entity.remove();
		};

	}
})();