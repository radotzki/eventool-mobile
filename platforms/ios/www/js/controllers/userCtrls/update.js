angular.module('eventool.controllers')

.controller('UserUpdateCtrl', function($scope, $ionicPopup, $window, $stateParams, User) {
	User.show($stateParams.userId).then(function(responseData) {
		$scope.user = responseData;
	});

	$scope.update = function(){
		User.update($scope.user);
		$window.history.back();
	};
})