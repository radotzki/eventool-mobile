(function() {
	'use strict';

	angular
	.module('eventool.events')
	.controller('ShowEvent', ShowEvent);

	/* @ngInject */
	function ShowEvent($ionicLoading, $stateParams, datacontext, user) {
		/*jshint validthis: true */
		var vm = this;
		vm.event;
		vm.tickets;
		vm.user = user;
		vm.income = 0;
		vm.femaleArrived = 0;
		vm.maleArrived = 0;
		vm.canEditEvent = false;

		activate();

		function activate() {
			$ionicLoading.show();
			getEvent().then(getTickets).then(analyzeTickets).then(checkCanEditEvent).then(stopLoading);
		}

		function getEvent() {
			return datacontext.event.show($stateParams.eventId).then(function(data){
				vm.event = data;
				return data;
			});
		}

		function checkCanEditEvent() {
			vm.canEditEvent = ((new Date(vm.event.when)) >= Date.now()) && (vm.user.role == 'producer');
			return vm.canEditEvent;
		}

		function getTickets() {
			return datacontext.event.getTickets(vm.event).then(function (tickets) {
				vm.tickets = tickets;
				return tickets;
			});
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

		function stopLoading() {
			return $ionicLoading.hide();
		}

	}
})();