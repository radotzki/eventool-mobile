angular.module('eventool.controllers')

.controller('UserUpdateCtrl', function($scope, $ionicPopup, $state, $stateParams, User) {
	User.show($stateParams.userId).then(function(responseData) {
		$scope.user = responseData;
	});

	$scope.update = function(){
		User.update($scope.user);
		$state.go('app.showUser', { "userId": $stateParams.userId});
	};
})