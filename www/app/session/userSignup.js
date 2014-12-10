angular.module('eventool.session')
.controller('UserCreateCtrl', function($scope, $window, Production, User, $ionicPopup) {
	$scope.user = {};

	Production.index().then(function(responseData) {
		$scope.productions = responseData;
	});

	$scope.register = function() {
		var userParams = {
			production_id: $scope.user.production,
			first_name: $scope.user.firstName,
			last_name: $scope.user.lastName,
			email: $scope.user.email,
			password: $scope.user.password,
			role: $scope.user.role
		};

		User.create(userParams).then(function() {
			var alertPopup = $ionicPopup.alert({
				title: 'User created',
				template: 'You need to wait for your producer to unlock your user.'
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});

	};
})

