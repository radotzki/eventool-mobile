angular.module('eventool.controllers')

.controller('ProductionCreateCtrl', function($scope, $window, $ionicPopup, Production, User) {
	$scope.user = {};
	$scope.create = function(production){
		var productionParams = {
			name: production.name,
			first_name: $scope.user.firstName,
			last_name: $scope.user.lastName,
			email: $scope.user.email,
			password: $scope.user.password,
			phone_number: $scope.user.phone
		};
		Production.create(productionParams).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'Production created',
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});	
		});
	};


})

