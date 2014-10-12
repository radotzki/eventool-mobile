angular.module('eventool.controllers')

.controller('TicketCreateCtrl', function($scope, $stateParams, $state, $ionicPopup, $window, orderByFilter, Ticket, Event, EventPrice) {

	Event.index().then(function(events){
		$scope.events = orderByFilter(events, '-when');

		if ($scope.events.length > 0){
			// Delete passed events
			for(var i=0; i<$scope.events.length; i++) {
				if($scope.eventPass($scope.events[i])) {
					$scope.events.splice(i, $scope.events.length - i);
				}
			}

			$scope.selectedEvent = $scope.events[0].id;
			$scope.getPrices($scope.selectedEvent);
		}
	});

	$scope.getPrices = function(selectedEvent) {
		EventPrice.index(selectedEvent).then(function(prices) {
			$scope.prices = orderByFilter(prices, 'price');
		});
	};

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

	$scope.createTicket = function(eventId, priceId) {
		Ticket.create($stateParams.clientId, {event_id: eventId, event_price_id: priceId}).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'ticket created! '
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};

})