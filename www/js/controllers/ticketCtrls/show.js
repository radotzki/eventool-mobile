angular.module('eventool.controllers')

.controller('TicketShowCtrl', function($scope, $stateParams, $ionicPopup, $state, $window, Ticket, Client) {

	Ticket.show($stateParams.clientId, $stateParams.ticketId).then(function(data){
		$scope.ticket = data;

		$scope.eventPass = eventPass($scope.ticket.event.when);

		$scope.canEdit = !$scope.eventPass && (!$scope.ticket.arrived) &&
		($scope.ticket.promoter.id == $scope.curUser.id || $scope.curUser.role == 'producer');
	});

	var eventPass = function(eventDate){
		return (new Date(eventDate)) < Date.now();
	}

})