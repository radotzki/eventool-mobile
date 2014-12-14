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
				'collapsBy': '@'
			},
			restrict: 'EA'
		};
		return directive;
	}

	/* @ngInject */
	function IndexTickets($scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.collapsBy = $scope.collapsBy;
		vm.tickets;
		vm.separatedTickets = [];

		$scope.$watch('tickets', function(newVal) {
			if($scope.tickets) { activate(); }
		}, true);

		function activate() {
			vm.tickets = $scope.tickets; 
			if ( vm.collapsBy == 'event' ) {
				seperateByEvent();
			} else if ( vm.collapsBy == 'client' ) {
				seperateByClient();
			}
		}

		function seperateByEvent() {
			for(var i=0; i < vm.tickets.length; i++){
				var eventIndex = findEventByName(vm.tickets[i].event.name);
				if ( eventIndex > -1 ){
					vm.separatedTickets[eventIndex].tickets.push(vm.tickets[i]);
					vm.separatedTickets[eventIndex].arriveCount += vm.tickets[i].arrived;	
				}
				else {
					vm.separatedTickets.push({
						tickets: [vm.tickets[i]],
						arriveCount: vm.tickets[i].arrived,
						when: vm.tickets[i].event.when,
						eventName: vm.tickets[i].event.name
					});	
				}
			}
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