(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('ShowClient', ShowClient);

	/* @ngInject */
	function ShowClient($stateParams, $state, user, ticketsPrepSvc, clientPrepSvc, friendsCountPrepSvc) {
		/*jshint validthis: true */
		var vm = this;
		vm.state = $state;
		vm.user = user;
		vm.client = clientPrepSvc;
		vm.tickets = ticketsPrepSvc;
		vm.arrivedCount = 0;
		vm.friendsCount = friendsCountPrepSvc;

		activate();

		function activate() {
			!!(vm.state.current.name == 'app.clients.detail') && $state.go('.tickets');
			analyzeTickets();
		}

		function analyzeTickets() {
			for (var i=0; i < vm.tickets.length; i++) {
				vm.arrivedCount += vm.tickets[i].arrived;
			}
		}

	}
})();