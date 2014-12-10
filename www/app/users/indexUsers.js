angular.module('eventool.users')

.controller('UserIndexCtrl', function($scope, $ionicPopup, $state, datacontext) {
	datacontext.user.index().then(function(responseData) {
		$scope.users = responseData;
	});

	$scope.unlockUser = function(user){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Unlock User',
			template: 'Are you sure you want to unlock ' + user.name + '?',
			okText: 'Yes'
		});
		confirmPopup.then(function(res) {
			if(res) {
				datacontext.user.unlock(user);
				$state.go('.', {}, { reload: true });
			}
		});
	};
})