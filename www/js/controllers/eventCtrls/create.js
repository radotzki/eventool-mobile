angular.module('eventool.controllers')

.controller('EventCreateCtrl', function($scope, Event, EventPrice, $state, $ionicPopup) {
	$scope.prices = ["0", "10", "20"];

	$scope.createEvent = function(event) {
		Event.create
		({when: new Date(event.datetime), name: event.name, prices: $scope.prices})
		.then(function(eventId){
			// Add prices
			for (var i=0; i < $scope.prices.length; i++) {
				EventPrice.create(eventId, {price: $scope.prices[i]});
			}

			var alertPopup = $ionicPopup.alert({
				title: 'Event \'' + event.name + '\' created! '
			});
			alertPopup.then(function(res) {
				$state.go('app.events');
			});
		});
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