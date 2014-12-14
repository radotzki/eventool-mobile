(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.friendship', RepositoryFriendship);

	/* @ngInject */
	function RepositoryFriendship(Restangular, AbstractRepository) {
		var abstract = AbstractRepository;

		var service = {
			index: index,
			create: create,
			remove: remove,
			count: count
		};
		return service;


		function index(clientId) {
			return Restangular.one('clients', clientId).getList('friends').then(abstract.querySucceed, abstract.queryFailed);
		}

		function count(clientId) {
			return Restangular.one('clients', clientId).one('friends/count').get().then(abstract.querySucceed, abstract.queryFailed);
		}

		function create(clientId, clientTwoId) {
			return Restangular.one('clients', clientId).post("friends", {client_two_id: clientTwoId}).then(abstract.querySucceed, abstract.queryFailed);
		}

		function remove(clientId, friendId) {
			return Restangular.one("clients", clientId).one("friends", friendId).customDELETE().then(abstract.querySucceed, abstract.queryFailed);
		}	

	}
})();