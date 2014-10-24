angular.module('eventool.controllers')

.controller('ClientIndexCtrl', function($scope, $ionicViewService, Client) {

	// if(localStorage["clients"]){
	// 	$scope.clients = JSON.parse(localStorage["clients"]);
	// }
	// else{
	// 	$scope.loading = true;
	// 	Client.index().then(function(data){
	// 		$scope.clients = data;
	// 		localStorage["clients"] = JSON.stringify(data);
	// 		$scope.loading = false;
	// 	});
	// }

	$scope.loading = true;
	Client.index().then(function(resp){
		$scope.clients = resp;
		$scope.loading = false;
	});

	// This a temporary solution to solve an issue where the back button is displayed when it should not be.
 	// This is fixed in the nightly ionic build so the next release should fix the issue
 	$ionicViewService.clearHistory();
 })