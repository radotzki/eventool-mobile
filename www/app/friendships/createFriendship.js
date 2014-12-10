angular.module('eventool.friendship')

.controller('SelectNewFriendCtrl', function($scope, $stateParams, $window, datacontext) {

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

	$scope.choose = function(client){
		datacontext.friendship.create($stateParams.clientId, client.id).then(function(){
			$window.history.back();
		})
	}

 })