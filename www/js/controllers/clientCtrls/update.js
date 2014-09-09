angular.module('eventool.controllers')

.controller('ClientUpdateCtrl', function($scope, $stateParams, $window, $ionicPopup,  Client) {
	Client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});

	$scope.updateClient = function() {
		Client.update($scope.client).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'Client saved!'
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};

})