angular.module('eventool.users')

.controller('UserUpdateCtrl', function($scope, $ionicPopup, $window, $stateParams, datacontext) {
	datacontext.user.show($stateParams.userId).then(function(responseData) {
		$scope.user = responseData;
	});

	$scope.update = function(){
		datacontext.user.update($scope.user);
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
				datacontext.user.lock($scope.user);
				$window.history.back();
			}
		});
	};
	
})