angular.module('eventool.tickets')

.controller('TicketCreateCtrl', function($scope, $stateParams, $state, $ionicPopup, $window, orderByFilter, datacontext) {

	datacontext.event.index().then(function(events){
		$scope.events = orderByFilter(events, '-when');

		if ($scope.events.length > 0){
			// Delete passed events
			for(var i=0; i<$scope.events.length; i++) {
				if($scope.eventPass($scope.events[i])) {
					$scope.events.splice(i, $scope.events.length - i);
				}
			}

			datacontext.ticket.index($stateParams.clientId).then(function(tickets) {
				$scope.tickets = tickets;

				for(var i=0; i<$scope.tickets.length; i++) {
					for(var j=0; j<$scope.events.length; j++) {
						if($scope.events[j].id == $scope.tickets[i].event.id)
							$scope.events.splice(j, 1);
					}
				}

				if ($scope.events.length > 0){
					$scope.selectedEvent = $scope.events[0].id;
					$scope.getPrices($scope.selectedEvent);
				}
			})

		}
	});

	$scope.getPrices = function(selectedEvent) {
		datacontext.eventPrice.index(selectedEvent).then(function(prices) {
			$scope.prices = orderByFilter(prices, 'price');
		});
	};

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

	$scope.createTicket = function(eventId, priceId) {
		datacontext.ticket.create($stateParams.clientId, {event_id: eventId, event_price_id: priceId}).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'ticket created! '
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};

})