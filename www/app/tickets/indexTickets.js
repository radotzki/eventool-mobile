(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.controller('IndexTickets', IndexTickets);

	/* @ngInject */
	function IndexTickets($rootScope, $state, $ionicModal, ticketsPrepSvc) {
		/*jshint validthis: true */
		var vm = this;
		vm.target = $state.current.data.target;
		vm.tickets = ticketsPrepSvc;
		vm.separatedTickets = [];
		vm.ticketModal;

		vm.showTicket = showTicket;

		activate();

		function activate() {
			if ( vm.target == 'user' || vm.target == 'client' ) {
				seperateByEvent();
			} else if ( vm.target == 'event' ) {
				seperateByClient();
			}
		}

		function showTicket (clientId, ticketId) {
			var modalScope = $rootScope.$new();
			modalScope.clientId = clientId;
			modalScope.ticketId = ticketId;
			modalScope.closeModal = closeModal;
			
			$ionicModal.fromTemplateUrl('app/tickets/showTicket.html', {
				animation: 'slide-in-up',
				scope: modalScope
			}).then(function(modal) {
				vm.ticketModal = modal;
				modal.show();
			});
		}

		function closeModal () {
			vm.ticketModal.remove();
		}

		function seperateByEvent() {
			for(var i=0; i < vm.tickets.length; i++){
				var eventIndex = findEventByName(vm.tickets[i].event.name);
				if ( eventIndex > -1 ){
					vm.separatedTickets[eventIndex].tickets.push(vm.tickets[i]);
					vm.separatedTickets[eventIndex].income += vm.tickets[i].price.price;	
					if ( vm.tickets[i].arrived ){
						vm.separatedTickets[eventIndex].arriveCount += vm.tickets[i].arrived;	
					} 
				}
				else {
					vm.separatedTickets.push(ticketAdapter(vm.tickets[i]));	
				}
			}
		}

		function ticketAdapter (ticket) {
			return {
				tickets: [ticket],
				arriveCount: ticket.arrived,
				when: ticket.event.when,
				eventName: ticket.event.name,
				income: ticket.arrived ? ticket.price.price : 0
			};
		}

		function findEventByName(name){
			var res = -1;
			for(var i=0; i < vm.separatedTickets.length; i++){
				if ( vm.separatedTickets[i].eventName == name )
					return i;
			}
			return res;
		}

	}
})();