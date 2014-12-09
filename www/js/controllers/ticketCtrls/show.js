angular.module('eventool.controllers')

.controller('TicketShowCtrl', function($scope, $stateParams, $ionicPopup, $state, $window, Ticket, Client, user) {

	Ticket.show($stateParams.clientId, $stateParams.ticketId).then(function(data){
		$scope.ticket = data;

		$scope.eventPass = eventPass($scope.ticket.event.when);

		$scope.canEdit = !$scope.eventPass && (!$scope.ticket.arrived) &&
		($scope.ticket.promoter.id == user.id || user.role == 'producer');
	});

	var eventPass = function(eventDate){
		return (new Date(eventDate)) < Date.now();
	}

})