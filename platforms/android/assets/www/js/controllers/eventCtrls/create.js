angular.module('eventool.controllers')

.controller('EventCreateCtrl', function($scope, Event, EventPrice, $state, $ionicPopup, $filter) {
	$scope.prices = ["0", "10", "20"];
	$scope.event = {when: new Date()};

	$scope.createEvent = function(myForm) {
		Event.create
		({when: $scope.event.when, name: $scope.event.name, prices: $scope.prices})
		.then(function(eventId){
			// Add prices
			for (var i=0; i < $scope.prices.length; i++) {
				EventPrice.create(eventId, {price: $scope.prices[i]});
			}

			var alertPopup = $ionicPopup.alert({
				title: 'Event \'' + $scope.event.name + '\' created! '
			});
			alertPopup.then(function(res) {
				$state.go('app.events');
			});
		});
	};


})

