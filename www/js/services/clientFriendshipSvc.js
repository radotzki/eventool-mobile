angular.module('eventool.services')

.factory('ClientFriendship', function($resource, Restangular) {
	var factory = {}

	factory.index = function(clientId) {
		return Restangular.one('clients', clientId).getList('friends');
	};

	factory.create = function(clientId, params) {
		return Restangular.one('clients', clientId).post("friends", params);
	};

	factory.delete = function(clientId, friendId) {
		return Restangular.one("clients", clientId).one("friends", friendId).customDELETE();
	};	

	return factory;
})