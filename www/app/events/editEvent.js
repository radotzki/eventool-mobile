angular.module('eventool.events')

.controller('EventUpdateCtrl', function($scope, $stateParams, $window, Event, EventPrice, $ionicPopup) {
	Event.show($stateParams.eventId).then(function(data){
		$scope.event = data;
		$scope.prices = [];

		for(var i=0; i < data.prices.length; i++) {
			$scope.prices.push(data.prices[i].price);	
		}
		
	});

	$scope.updateEvent = function(){
		Event.update($scope.event);

		for (var i=0; i<$scope.prices.length; i++){
			var found = false;
			for (var j=0; j<$scope.event.prices.length; j++){
				if ($scope.prices[i] == $scope.event.prices[j].price){
					found = true;
					break;
				}
			}

			if (!found) {
				EventPrice.create($stateParams.eventId, {price: $scope.prices[i]});
			}
		}

		for (var i=0; i<$scope.event.prices.length; i++){
			var found = false;
			for (var j=0; j<$scope.prices.length; j++){
				if ($scope.event.prices[i].price == $scope.prices[j]){
					found = true;
					break;
				}
			}

			if (!found) {
				EventPrice.show($stateParams.eventId, $scope.event.prices[i].id)
				.then(function(data){
					EventPrice.delete(data);
				});
				
			}
		}

		var alertPopup = $ionicPopup.alert({
			title: 'Event \'' + $scope.event.name + '\' saved!'
		});
		alertPopup.then(function(res) {
			$window.history.back();
		});
	}	

})