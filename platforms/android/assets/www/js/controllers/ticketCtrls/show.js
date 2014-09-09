angular.module('eventool.controllers')

.controller('TicketShowCtrl', function($scope, $stateParams, $ionicPopup, $state, $window, Ticket) {

	Ticket.show($stateParams.clientId, $stateParams.ticketId).then(function(data){
		$scope.ticket = data;

		$scope.canEdit = !$scope.eventPass($scope.ticket.event) && (!$scope.ticket.arrived) &&
		($scope.ticket.promoter.id == $scope.curUser.id || $scope.curUser.role == 'producer');

		$scope.arrived = $scope.eventPass($scope.ticket.event) && $scope.ticket.arrived;
		$scope.notArrived = $scope.eventPass($scope.ticket.event) && !$scope.ticket.arrived;
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
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

	$scope.checkin = function(){
		Ticket.checkin($stateParams.clientId, $stateParams.ticketId).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'Ticket checkin'
			});
			alertPopup.then(function(res) {
				$state.go('app.clients');
			});
		});
	};
})