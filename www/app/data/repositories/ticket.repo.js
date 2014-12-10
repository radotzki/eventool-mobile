(function() {
	'use strict';

	angular
	.module('eventool.data')
	.factory('repository.ticket', RepositoryTicket);

	/* @ngInject */
	function RepositoryTicket(Restangular, AbstractRepository) {
		var abstract = AbstractRepository;

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
			return Restangular.one('clients', clientId).getList('tickets')
			.then(abstract.querySucceed, abstract.queryFailed);
		};

		function show(clientId, ticketId) {
			return Restangular.one('clients', clientId).one('tickets', ticketId).get()
			.then(abstract.querySucceed, abstract.queryFailed);
		};

		function create(clientId, params) {
			return Restangular.one('clients', clientId).post("tickets", params)
			.then(abstract.querySucceed, abstract.queryFailed);
		};

		function update(entity) {
			return entity.put()
			.then(abstract.querySucceed, abstract.queryFailed);
		};

		function remove(entity) {
			return entity.remove()
			.then(abstract.querySucceed, abstract.queryFailed);
		};	

		function checkin(clientId, ticketId) {
			return Restangular.one('clients', clientId).one('tickets', ticketId).customPUT({},"checkin")
			.then(abstract.querySucceed, abstract.queryFailed);
		};	

		function changePrice(clientId, ticketId, priceId) {
			return Restangular.one('clients', clientId).one('tickets', ticketId)
			.customPUT({},"change_price",  {event_price_id: priceId})
			.then(abstract.querySucceed, abstract.queryFailed);
		};

		function currentEvent(clientId) {
			return Restangular.one('clients', clientId).getList('tickets/current_event')
			.then(abstract.querySucceed, abstract.queryFailed);
		};

	}
})();