angular.module('eventool.controllers')

.controller('UserShowCtrl', function($scope, $stateParams, User, Event, orderByFilter) {
	$scope.selectedEvent = {};
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
		});
	});

	Event.index().then(function(events){
		$scope.events = orderByFilter(events, '-when');
		$scope.selectedEvent.id = $scope.events[0].id;
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

})