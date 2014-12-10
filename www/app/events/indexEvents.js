angular.module('eventool.events')

.controller('EventIndexCtrl', function($scope, datacontext, user) {

	$scope.user = user;

	datacontext.event.index().then(function(data){
		$scope.events = data;	
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	}

})