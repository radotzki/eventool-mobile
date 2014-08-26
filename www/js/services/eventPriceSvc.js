angular.module('eventool.services')

.factory('EventPrice', function(Restangular) {
	var factory = {}

	factory.index = function(eventId) {
		return Restangular.one('events', eventId).getList('prices');
	};

	factory.show = function(eventId, priceId) {
		return Restangular.one('events', eventId).one('prices', priceId).get();
	};

	factory.create = function(eventId, params) {
		return Restangular.one('events', eventId).post("prices", params);
	};

	factory.update = function(entity) {
		return entity.put();
	};

	factory.delete = function(entity) {
		return entity.remove();
	};	

	return factory;
})