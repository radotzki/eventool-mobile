angular.module('eventool.controllers')

.controller('ClientShowCtrl', function($scope, $stateParams, Client) {
	Client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});
})