angular.module('eventool.services')

.factory('Friendship', function(Restangular) {
	var factory = {}

	var base = Restangular.all('clients');

	factory.index = function(clientId) {
		return Restangular.one('clients', clientId).getList('friends');
	};

	factory.create = function(originClientId, otherClientId) {
		return Restangular.one('clients', originClientId).post("friends", {client_two_id: otherClientId});
	};

	factory.delete = function(entity) {
		return entity.remove();
	};

	return factory;
})