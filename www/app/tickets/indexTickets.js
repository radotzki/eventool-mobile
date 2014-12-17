(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.directive('etTickets', etTickets);

	/* @ngInject */
	function etTickets () {
		var directive = {
			controller: IndexTickets,
			controllerAs: 'vm',
			templateUrl: 'app/tickets/indexTickets.html',
			scope: {
				'tickets': '=',
				'target': '@'
			},
			restrict: 'EA'
		};
		return directive;
	}

	/* @ngInject */
	function IndexTickets($scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.target = $scope.target;
		vm.tickets;
		vm.separatedTickets = [];

		$scope.$watch('tickets', function(newVal) {
			if($scope.tickets) { activate(); }
		}, true);

		function activate() {
			vm.tickets = $scope.tickets; 
			if ( vm.target == 'user' || vm.target == 'client' ) {
				seperateByEvent();
			} else if ( vm.target == 'event' ) {
				seperateByClient();
			}
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