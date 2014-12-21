(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.controller('CreateTicket', CreateTicket);

	/* @ngInject */
	function CreateTicket($state, $stateParams, datacontext) {
		/*jshint validthis: true */
		var vm = this;

		vm.events;
		vm.selectedEvent;
		vm.selectedPrice;

		vm.createTicket = createTicket;

		activate();

		function activate() {
			getUpcomingEvents();
		}

		function getUpcomingEvents () {
			return datacontext.event.upcoming().then(function (data) {
				vm.events = data;
				return data;
			});
		}

		function createTicket () {
			var param = {
				event_id: vm.selectedEvent.id,
				event_price_id: vm.selectedPrice.id
			};

			datacontext.ticket.create($stateParams.clientId, param).then(function(res){
				$state.go('app.clients.detail.tickets', {clientId: $stateParams.clientId});
			});
		}

	}
})();