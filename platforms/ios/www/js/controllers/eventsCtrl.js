angular.module('eventool.controllers')

.controller('EventsIndexCtrl', function($scope, Event) {
	Event.index().then(function(data){
		$scope.events = data;	
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	}

})

.controller('EventCreateCtrl', function($scope, Event) {
	$scope.prices = [0,10,20];

	$scope.createEvent = function(event) {
		console.log(event);
		console.log(new Date(event.datetime));
	};

	$scope.addPrice = function(newPrice) {
		// Check if price exist
		var addToArray = true;
		for(var i = 0; i < $scope.prices.length; i++){
			if($scope.prices[i] === newPrice){
				addToArray = false;
			}
		}

		if(addToArray){
			$scope.prices.push(newPrice);
		}
	};

	$scope.deletePrice = function  (index) {
		$scope.prices.splice(index, 1);
	};
})

.controller('EventShowCtrl', function($scope, Event, $stateParams, EventPrice, Client) {
	Event.show($stateParams.eventId).then(function(data){
		$scope.event = data;

		$scope.eventPass = false;
		if ((new Date(data.when)) < Date.now()) {
			$scope.eventPass = true;
		}
	});

	Event.show($stateParams.eventId).then(function (responseData) {
		Event.getTickets(responseData).then(function (tickets) {
			$scope.tickets = tickets;

			// Statistic
			$scope.arrivedCount=0;
			$scope.maleArrived=0;
			$scope.income=0;

			for(i=0; i<tickets.length;i++){
				if(tickets[i].arrived){
					$scope.arrivedCount++;
					$scope.income+=tickets[i].price.price;					
					$scope.maleArrived+= (tickets[i].client.gender == "male") ? 1:0;
				}
			}

		})});
})

.controller('EventUpdateCtrl', function($scope, Event) {

})

.controller('EventDeleteCtrl', function($scope, Event) {

})