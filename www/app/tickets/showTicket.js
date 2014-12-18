(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.controller('ShowTicket', ShowTicket);

	/* @ngInject */
	function ShowTicket($scope, datacontext) {
		/*jshint validthis: true */
		var vm = this;

		vm.clientId = $scope.clientId;
		vm.ticketId = $scope.ticketId;
		vm.closeModal = $scope.closeModal;
		vm.ticket;

		activate();

		function activate() {
			getTicket();
		}

		function getTicket () {
			return datacontext.ticket.show(vm.clientId, vm.ticketId).then(function(data){
				vm.ticket = data;
				return data;
			});
		}

	}
})();

// angular.module('eventool.tickets')

// .controller('TicketShowCtrl', function($scope, $stateParams, $ionicPopup, $state, $window, datacontext, user) {

// 	datacontext.ticket.show($stateParams.clientId, $stateParams.ticketId).then(function(data){
// 		$scope.ticket = data;

// 		$scope.eventPass = eventPass($scope.ticket.event.when);

// 		$scope.canEdit = !$scope.eventPass && (!$scope.ticket.arrived) &&
// 		($scope.ticket.promoter.id == user.id || user.role == 'producer');
// 	});

// 	var eventPass = function(eventDate){
// 		return (new Date(eventDate)) < Date.now();
// 	}

// })