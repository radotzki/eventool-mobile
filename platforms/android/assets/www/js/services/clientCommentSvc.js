angular.module('eventool.services')

.factory('ClientComment', function(Restangular) {
	var factory = {}

	factory.index = function(clientId) {
		return Restangular.one('clients', clientId).getList('comments');
	};

	factory.show = function(clientId, commentId) {
		return Restangular.one('clients', clientId).one('comments', commentId).get();
	};

	factory.create = function(clientId, params) {
		return Restangular.one('clients', clientId).post("comments", params);
	};

	factory.update = function(entity) {
		return entity.put();
	};

	factory.delete = function(entity) {
		return entity.remove();
	};	

	return factory;
})