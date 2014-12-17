(function() {
	'use strict';

	angular
	.module('eventool.users')
	.controller('ShowUser', ShowUser);

	function ShowUser($stateParams, $ionicLoading, datacontext) {
		var vm = this;

		vm.arrivedAmount = 0;
		vm.income = 0;
		vm.user;
		vm.tickets;

		activate();

		function activate() {
			$ionicLoading.show();
			return getUser().then(getUserTickets).then(anlyzeTickets).then(stopLoading);
		}

		function getUser() {
			return datacontext.user.show($stateParams.userId).then(function(user) {
				vm.user = user;		
				return user;
			})
		}

		function getUserTickets(user) {
			return datacontext.user.getTickets(user).then(function(tickets){
				vm.tickets = tickets;
				return tickets;
			})
		}

		function anlyzeTickets (tickets) {
			for(var i=0; i < tickets.length; i++){
				if(tickets[i].arrived){
					vm.arrivedAmount++;
					vm.income += tickets[i].price.price;
				}
			}
		}

		function stopLoading () {
			$ionicLoading.hide();
		}

	}

})();