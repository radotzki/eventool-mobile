angular.module('eventool.session')

.controller('ProductionCreateCtrl', function($scope, $window, $ionicPopup, datacontext) {
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
		datacontext.production.create(productionParams).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'Production created',
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});	
		});
	};


})

