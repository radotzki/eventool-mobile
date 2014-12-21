(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.controller('IndexTickets', IndexTickets);

	/* @ngInject */
	function IndexTickets($rootScope, $state, $ionicModal, ticketsPrepSvc) {
		/*jshint validthis: true */
		var vm = this;
		
		var tickets = ticketsPrepSvc;
		var ticketModal;
		vm.target = $state.current.data.target;
		vm.separatedTickets = [];
		
		vm.showTicket = showTicket;
		vm.createTicket = createTicket;

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
				ticketModal = modal;
				modal.show();
			});
		}

		function createTicket () {
			
		}

		function closeModal (ticket) {
			!!ticket && removeTicketFromView(ticket);
			ticketModal.remove();
		}

		function removeTicketFromView (ticket) {
			var eventTickets = vm.separatedTickets[findEventByName(ticket.event.name)].tickets;
			for (var i = eventTickets.length - 1; i >= 0; i--) {
				if ( eventTickets[i].id == ticket.id ) {
					eventTickets.splice(i, 1);
				}
			};
		}

		function seperateByEvent() {
			for(var i=0; i < tickets.length; i++){
				var eventIndex = findEventByName(tickets[i].event.name);
				if ( eventIndex > -1 ){
					vm.separatedTickets[eventIndex].tickets.push(tickets[i]);
						
					if ( tickets[i].arrived ){
						vm.separatedTickets[eventIndex].arriveCount += tickets[i].arrived;	
						vm.separatedTickets[eventIndex].income += tickets[i].price.price;
					} 
				}
				else {
					vm.separatedTickets.push(ticketAdapter(tickets[i]));	
				}
			}
		}

		function ticketAdapter (ticket) {
			return {
				tickets: [ticket],
				arriveCount: ticket.arrived ? 1 : 0,
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