angular.module('eventool.controllers')

.controller('EventsIndexCtrl', function($scope, Event) {
	Event.index().then(function(data){
		$scope.events = data;	
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	}

})