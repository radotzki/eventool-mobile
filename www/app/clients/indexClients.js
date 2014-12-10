angular.module('eventool.clients')

.controller('ClientIndexCtrl', function($scope, $ionicViewService, user, datacontext) {

	$scope.user = user;

	if(localStorage["clients"]){
		$scope.clients = JSON.parse(localStorage["clients"]);
	}
	else{
		$scope.loading = true;
		datacontext.client.index().then(function(data){
			$scope.clients = data;
			localStorage["clients"] = JSON.stringify(data);
			$scope.loading = false;
		});
	}

	datacontext.client.index().then(function(data){
		localStorage["clients"] = JSON.stringify(data);
	});

	$scope.doRefresh = function(){
		datacontext.client.index().then(function(data){
			$scope.clients = data;
			localStorage["clients"] = JSON.stringify(data);
			$scope.$broadcast('scroll.refreshComplete');
		});
	}

	// This a temporary solution to solve an issue where the back button is displayed when it should not be.
 	// This is fixed in the nightly ionic build so the next release should fix the issue
 	$ionicViewService.clearHistory();
 })