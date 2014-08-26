angular.module('eventool.services')

.factory('Production', function(Restangular) {
	var factory = {}

	var base = Restangular.all('productions');

	factory.index = function() {
		return base.getList();
	};

	factory.show = function(id) {
		return base.get(id);
	};

	factory.create = function(params) {
		return base.post(params);
	};

	factory.update = function(entity) {
		return entity.put();
	};

	factory.delete = function(entity) {
		return entity.remove();
	};	

	return factory;
})