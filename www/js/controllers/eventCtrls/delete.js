angular.module('eventool.controllers')

.controller('EventDeleteCtrl', function($scope, $stateParams, Event, $state, $ionicPopup) {
	Event.show($stateParams.eventId).then(function(data){
		$scope.event = data;
	});

	$scope.delete = function(){
		Event.delete($scope.event);

		var alertPopup = $ionicPopup.alert({
			title: 'Event \'' + $scope.event.name + '\' deleted!'
		});
		alertPopup.then(function(res) {
			$state.go('app.events');
		});
	}

})