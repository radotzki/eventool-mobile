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

	$scope.deleteTicket = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Ticket',
			template: 'Are you sure you want to delete this ticket?',
			okText: 'Yes'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Ticket.delete($scope.ticket);
				$window.history.back();
			}
		});
	};

})