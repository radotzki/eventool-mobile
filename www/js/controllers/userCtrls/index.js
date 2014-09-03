angular.module('eventool.controllers')

.controller('UserIndexCtrl', function($scope, User) {
	$scope.users = [];
	$scope.lockUsers = [];

	User.index().then(function(responseData) {
		$scope.users = responseData;
	});

	$scope.unlockUser = function(user){
		console.log(user);
	};
})