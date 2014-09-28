angular.module('eventool.services')

.factory('ClientFriendship', function(Restangular) {
	var factory = {}

	factory.index = function(clientId) {
		return Restangular.one('clients', clientId).getList('friends');
	};

	factory.create = function(clientId, clientTwoId) {
		return Restangular.one('clients', clientId).post("friends", {client_two_id: clientTwoId});
	};

	factory.delete = function(clientId, friendId) {
		return Restangular.one("clients", clientId).one("friends", friendId).customDELETE();
	};	

	return factory;
})