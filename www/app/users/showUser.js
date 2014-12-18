(function() {
	'use strict';

	angular
	.module('eventool.users')
	.controller('ShowUser', ShowUser);

	function ShowUser($stateParams, $state, userPrepSvc, ticketsPrepSvc) {
		var vm = this;

		vm.state = $state;
		vm.arrivedAmount = 0;
		vm.income = 0;
		vm.user = userPrepSvc;
		vm.tickets = ticketsPrepSvc;

		activate();

		function activate() {
			!!(!vm.state.current.data.name) && $state.go('.tickets');
			anlyzeTickets();
		}

		function anlyzeTickets () {
			for(var i=0; i < vm.tickets.length; i++){
				if(vm.tickets[i].arrived){
					vm.arrivedAmount++;
					vm.income += vm.tickets[i].price.price;
				}
			}
		}

	}
})();