angular.module('eventool.clients')

.controller('ClientCreateCtrl', function($scope, $window, $ionicPopup, datacontext) {
	$scope.client = {};
	
	$scope.createClient = function(){
		var param = {
			first_name: $scope.client.firstName,
			last_name: $scope.client.lastName,
			gender: $scope.client.gender,
			birthdate: $scope.client.birthdate,
			phone_number: $scope.client.phone,
			city: $scope.client.city
		};

		datacontext.client.create(param).then(function(res){
			var alertPopup = $ionicPopup.alert({
				title: 'Client created!'
			});
			alertPopup.then(function(res) {
				$window.history.back();
			});
		});
	};
})