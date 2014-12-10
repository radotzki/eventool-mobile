(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.friendship', RepositoryFriendship);

	/* @ngInject */
	function RepositoryFriendship(Restangular) {

		var service = {
			index: index,
			create: create,
			remove: remove
		};
		return service;


		function index(clientId) {
			return Restangular.one('clients', clientId).getList('friends');
		};

		function create(clientId, clientTwoId) {
			return Restangular.one('clients', clientId).post("friends", {client_two_id: clientTwoId});
		};

		function remove(clientId, friendId) {
			return Restangular.one("clients", clientId).one("friends", friendId).customDELETE();
		};	

	}
})();