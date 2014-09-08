angular.module('eventool.controllers')

.controller('TicketUpdateCtrl', function($scope, $stateParams, $state, $ionicPopup, $window, orderByFilter, Ticket, Event, EventPrice) {

	Ticket.show($stateParams.clientId, $stateParams.ticketId).then(function(ticket){
		$scope.ticket = ticket;

		EventPrice.index($scope.ticket.event.id).then(function(prices) {
			$scope.prices = orderByFilter(prices, 'price');
		});
	});

	$scope.UpdateTicket = function() {
		Ticket.changePrice($stateParams.clientId, $stateParams.ticketId, $scope.ticket.price.id)
		.then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'ticket updated! '
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};

})