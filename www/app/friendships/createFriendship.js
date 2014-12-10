angular.module('eventool.friendship')

.controller('SelectNewFriendCtrl', function($scope, $stateParams, $window, Client, Friendship) {

	if(localStorage["clients"]){
		$scope.clients = JSON.parse(localStorage["clients"]);
	}
	else{
		$scope.loading = true;
		Client.index().then(function(data){
			$scope.clients = data;
			localStorage["clients"] = JSON.stringify(data);
			$scope.loading = false;
		});
	}

	Client.index().then(function(data){
		localStorage["clients"] = JSON.stringify(data);
	});

	$scope.doRefresh = function(){
		Client.index().then(function(data){
			$scope.clients = data;
			localStorage["clients"] = JSON.stringify(data);
			$scope.$broadcast('scroll.refreshComplete');
		});
	}

	$scope.choose = function(client){
		Friendship.create($stateParams.clientId, client.id).then(function(){
			$window.history.back();
		})
	}

 })