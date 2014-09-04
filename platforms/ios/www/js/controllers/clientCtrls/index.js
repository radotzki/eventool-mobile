angular.module('eventool.controllers')

.controller('ClientIndexCtrl', function($scope, Client) {
	Client.index().then(function(data){
		$scope.clients = data;	
	});


})