angular.module('eventool.clients')

.controller('ClientUpdateCtrl', function($scope, $stateParams, $window, $ionicPopup,  datacontext) {
	datacontext.client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});

	$scope.updateClient = function() {
		datacontext.client.update($scope.client).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'Client saved!'
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};

	$scope.deleteClient = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Client',
			template: 'Are you sure you want to delete ' + $scope.client.name + '?',
			okText: 'Yes'
		});
		confirmPopup.then(function(res) {
			if(res) {
				datacontext.client.remove($scope.client);
				$window.history.back();
			}
		});
	};

})