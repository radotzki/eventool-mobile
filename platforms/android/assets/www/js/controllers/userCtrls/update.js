angular.module('eventool.controllers')

.controller('UserUpdateCtrl', function($scope, $ionicPopup, $window, $stateParams, User) {
	User.show($stateParams.userId).then(function(responseData) {
		$scope.user = responseData;
	});

	$scope.update = function(){
		User.update($scope.user);
		$window.history.back();
	};

	$scope.lockUser = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Lock User',
			template: 'Are you sure you want to lock ' + $scope.user.name + '?',
			okText: 'Yes'
		});
		confirmPopup.then(function(res) {
			if(res) {
				User.lock($scope.user);
				$window.history.back();
			}
		});
	};
	
})