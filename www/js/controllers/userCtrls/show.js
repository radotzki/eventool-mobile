angular.module('eventool.controllers')

.controller('UserShowCtrl', function($scope, $stateParams, $ionicPopup, $state, User, Event, orderByFilter) {
	$scope.selectedEvent = {};
	$scope.EventArrived = 0;
	$scope.EventNotArrived = 0;

	Event.index().then(function(events){
		$scope.events = orderByFilter(events, '-when');
		$scope.selectedEvent.id = $scope.events[0].id;
	});

	User.show($stateParams.userId).then(function(responseData) {
		$scope.user = responseData;

		User.getTickets(responseData).then(function(tickets){
			$scope.tickets = tickets;

			// Sum arrived clients
			$scope.arrivedSum = 0;
			angular.forEach($scope.tickets, function(ticket){
				if(ticket.arrived)
					$scope.arrivedSum++;
			});

			$scope.changeEvent();
		});
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

	$scope.changeEvent = function(){
		$scope.EventArrived = 0;
		$scope.EventNotArrived = 0;

		angular.forEach($scope.tickets, function(ticket){
			if(ticket.event.id == $scope.selectedEvent.id && ticket.arrived)
				$scope.EventArrived++;
			else if(ticket.event.id == $scope.selectedEvent.id)
				$scope.EventNotArrived++;
		});
	};

	$scope.lockUser = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Lock User',
			template: 'Are you sure you want to lock ' + $scope.user.name + '?',
			okText: 'Yes'
		});
		confirmPopup.then(function(res) {
			if(res) {
				User.lock($scope.user);
				$state.go('app.users')
			}
		});
	};

})