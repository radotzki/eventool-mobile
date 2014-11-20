angular.module('eventool.controllers')

.controller('UserShowCtrl', function($scope, $stateParams, $ionicPopup, $window, User, Event, orderByFilter) {
	$scope.selectedEvent = {};
	$scope.EventArrived = 0;
	$scope.EventNotArrived = 0;

	Event.index().then(function(events){
		$scope.events = orderByFilter(events, '-when');
		if ($scope.events.length > 0){
			$scope.selectedEvent.id = $scope.events[0].id;
		}
	});

	User.show($stateParams.userId).then(function(responseData) {
		$scope.user = responseData;

		User.getTickets(responseData).then(function(tickets){
			$scope.tickets = tickets;

			$scope.arrivedSum = 0;
			$scope.income = 0;
			for(i=0; i<$scope.tickets.length;i++){
				if($scope.tickets[i].arrived){
					$scope.arrivedSum++;
					$scope.income += $scope.tickets[i].price.price;
				}
			}
		});
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

})