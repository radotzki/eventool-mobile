(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.ticket', RepositoryTicket);

	/* @ngInject */
	function RepositoryTicket(Restangular) {

		var service = {
			index: index,
			show: show,
			create: create,
			update: update,
			remove: remove,
			checkin: checkin,
			changePrice: changePrice,
			currentEvent: currentEvent
		};
		return service;


		function index(clientId) {
			return Restangular.one('clients', clientId).getList('tickets');
		};

		function show(clientId, ticketId) {
			return Restangular.one('clients', clientId).one('tickets', ticketId).get();
		};

		function create(clientId, params) {
			return Restangular.one('clients', clientId).post("tickets", params);
		};

		function update(entity) {
			return entity.put();
		};

		function remove(entity) {
			return entity.remove();
		};	

		function checkin(clientId, ticketId) {
			return Restangular.one('clients', clientId).one('tickets', ticketId).customPUT({},"checkin");
		};	

		function changePrice(clientId, ticketId, priceId) {
			return Restangular.one('clients', clientId).one('tickets', ticketId).customPUT({},"change_price",  {event_price_id: priceId});
		};

		function currentEvent(clientId) {
			return Restangular.one('clients', clientId).getList('tickets/current_event');
		};

	}
})();