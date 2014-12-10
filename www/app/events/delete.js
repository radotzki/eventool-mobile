angular.module('eventool.events')

.controller('EventDeleteCtrl', function($scope, $stateParams, datacontext, $window, $ionicPopup) {
	datacontext.event.show($stateParams.eventId).then(function(data){
		$scope.event = data;
	});

	$scope.delete = function(){
		datacontext.event.remove($scope.event);

		var alertPopup = $ionicPopup.alert({
			title: 'Event \'' + $scope.event.name + '\' deleted!'
		});
		alertPopup.then(function(res) {
			$window.history.back();
		});
	}

})