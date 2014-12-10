(function() {
	'use strict';

	angular
	.module('eventool.users')
	.controller('UserShowCtrl', UserShowCtrl);

	function UserShowCtrl($stateParams, User) {
		var vm = this;

		vm.arrivedAmount = 0;
		vm.income = 0;
		vm.user = {};
		vm.ticketsAmount = 0;
		vm.ticketsByEvents = [];

		activate();

		function activate() {
			return getUser().then(function(user) {
				getUserTickets(user);
			})
		}

		function getUser() {
			return User.show($stateParams.userId).then(function(user) {
				vm.user = user;		
				return user;
			})
		}

		function getUserTickets(user) {
			User.getTickets(user).then(function(tickets){
				vm.ticketsAmount = tickets.length;

				for(var i=0; i<tickets.length;i++){
					if(tickets[i].arrived){
						vm.arrivedAmount++;
					}

					var event = findEventByName(tickets[i].event.name);
					if ( event != -1 ){
						vm.ticketsByEvents[event].tickets.push(tickets[i]);
						vm.ticketsByEvents[event].arriveCount += tickets[i].arrived;	
					}
					else {
						vm.ticketsByEvents.push({
							tickets: [tickets[i]],
							arriveCount: tickets[i].arrived,
							when: tickets[i].event.when,
							eventName: tickets[i].event.name
						});	
					}
				}
			})
		}

		function findEventByName(name){
			var res = -1;
			for(var i=0; i < vm.ticketsByEvents.length; i++){
				if ( vm.ticketsByEvents[i].eventName == name )
					return i;
			}
			return res;
		}

	}

})();