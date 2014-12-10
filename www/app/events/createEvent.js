angular.module('eventool.events')

.controller('EventCreateCtrl', function($scope, datacontext, $window, $ionicPopup, $filter) {
	$scope.prices = ["0", "10", "20"];
	$scope.event = {when: new Date()};

	$scope.createEvent = function(myForm) {
		datacontext.event.create
		({when: $scope.event.when, name: $scope.event.name, prices: $scope.prices})
		.then(function(eventId){
			// Add prices
			for (var i=0; i < $scope.prices.length; i++) {
				datacontext.eventPrice.create(eventId, {price: $scope.prices[i]});
			}

			var alertPopup = $ionicPopup.alert({
				title: 'Event \'' + $scope.event.name + '\' created! '
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};


})

