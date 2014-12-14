(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('ShowClient', ShowClient);

	/* @ngInject */
	function ShowClient($stateParams, $ionicLoading, user, datacontext) {
		/*jshint validthis: true */
		var vm = this;
		
		vm.user = user;
		vm.client;
		vm.tickets;
		vm.arrivedCount = 0;
		vm.friendsCount = 0;

		activate();

		function activate() {
			getClient();
			getTickets().then(analyzeTickets);
			getFriendsCount();
		}

		function getClient() {
			$ionicLoading.show();
			return datacontext.client.show($stateParams.clientId).then(function(data){
				vm.client = data;
				$ionicLoading.hide();
				return data;
			});
		}

		function getTickets() {
			return datacontext.ticket.index($stateParams.clientId).then(function(tickets) {
				vm.tickets = tickets;
				return tickets;
			});
		}

		function analyzeTickets() {
			for (var i=0; i < vm.tickets.length; i++) {
				vm.arrivedCount += vm.tickets[i].arrived;
			}
		}

		function getFriendsCount() {
			return datacontext.friendship.count($stateParams.clientId).then(function(data){
				vm.friendsCount = data;
				return data;
			})
		}

	}
})();