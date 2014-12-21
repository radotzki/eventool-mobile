(function() {
	'use strict';

	angular
	.module('eventool.events')
	.controller('ShowEvent', ShowEvent);

	/* @ngInject */
	function ShowEvent($state, user, eventPrepSvc, ticketsPrepSvc) {
		/*jshint validthis: true */
		var vm = this;
		vm.state = $state;
		vm.event = eventPrepSvc;
		vm.tickets = ticketsPrepSvc;
		vm.user = user;
		vm.income = 0;
		vm.femaleArrived = 0;
		vm.maleArrived = 0;
		vm.canEditEvent = false;

		activate();

		function activate() {
			!!(!vm.state.current.data.name) && $state.go('.tickets');
			analyzeTickets();
			checkCanEditEvent();
		}

		function checkCanEditEvent() {
			vm.canEditEvent = ((new Date(vm.event.when)) >= Date.now()) && (vm.user.role == 'producer');
			return vm.canEditEvent;
		}

		function analyzeTickets() {
			for (var i=0; i < vm.tickets.length; i++) {
				if(vm.tickets[i].arrived){
					vm.income += vm.tickets[i].price.price;	
					vm.tickets[i].client.gender == "male" ? vm.maleArrived++ : vm.femaleArrived++;				
				}
			}
			return true;
		}

	}
})();