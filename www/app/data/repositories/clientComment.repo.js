(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.clientComment', RepositoryClientComment);

	/* @ngInject */
	function RepositoryClientComment(Restangular, AbstractRepository) {
		var abstract = AbstractRepository;

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove
		};
		return service;


		function index(clientId) {
			return Restangular.one('clients', clientId).getList('comments').then(abstract.querySucceed, abstract.queryFailed);
		}

		function show(clientId, commentId) {
			return Restangular.one('clients', clientId).one('comments', commentId).get().then(abstract.querySucceed, abstract.queryFailed);
		}

		function create(clientId, params) {
			return Restangular.one('clients', clientId).post("comments", params).then(abstract.querySucceed, abstract.queryFailed);
		}

		function update(entity) {
			return entity.put().then(abstract.querySucceed, abstract.queryFailed);
		}

		function remove(entity) {
			return entity.remove().then(abstract.querySucceed, abstract.queryFailed);
		}

	}
})();