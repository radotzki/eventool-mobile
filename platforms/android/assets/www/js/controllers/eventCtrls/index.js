angular.module('eventool.controllers')

.controller('EventIndexCtrl', function($scope, Event) {
	Event.index().then(function(data){
		$scope.events = data;	
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	}

})