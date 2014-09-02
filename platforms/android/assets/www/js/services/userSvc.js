angular.module('eventool.services')

.factory('User', function(Restangular) {
	var factory = {}

	var base = Restangular.all('users');

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

	factory.getTickets = function (entity) {
		return entity.getList('tickets')
	};

	factory.unlock = function (entity) {
		return entity.customPUT({}, "unlock");
	};	

	factory.changeRole = function (entity, role) {
		return entity.customPUT({}, "change_role", {role: role});
	};

	factory.currentUser = function () {
		return Restangular.one('current_user').get();
	};	

	return factory;
})