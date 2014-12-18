angular.module('eventool.tickets')

.controller('TicketUpdateCtrl', function($scope, $stateParams, $state, $ionicPopup, $window, orderByFilter, datacontext) {

	datacontext.ticket.show($stateParams.clientId, $stateParams.ticketId).then(function(ticket){
		$scope.ticket = ticket;

		datacontext.eventPrice.index($scope.ticket.event.id).then(function(prices) {
			$scope.prices = orderByFilter(prices, 'price');
		});
	});

	$scope.UpdateTicket = function() {
		datacontext.ticket.changePrice($stateParams.clientId, $stateParams.ticketId, $scope.ticket.price.id)
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
				datacontext.ticket.remove($scope.ticket);
				$state.go('app.clients.detail', { clientId: $stateParams.clientId } );
			}
		});
	};

})