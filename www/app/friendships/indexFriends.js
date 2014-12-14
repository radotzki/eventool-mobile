(function() {
	'use strict';

	angular
	.module('eventool.friendship')
	.directive('etFriends', etFriends);

	/* @ngInject */
	function etFriends () {
		var directive = {
			controller: IndexFriends,
			controllerAs: 'vm',
			templateUrl: 'app/friendships/indexFriends.html',
			restrict: 'EA',
			scope: {
				'clientId': '@'
			}
		};
		return directive;
	}

	/* @ngInject */
	function IndexFriends($scope, $ionicLoading, datacontext) {
		/*jshint validthis: true */
		var vm = this;
		
		vm.clientId = $scope.clientId;
		vm.friends;

		activate();

		function activate() {
			getFriends();
		}

		function getFriends() {
			$ionicLoading.show();
			return datacontext.friendship.index(vm.clientId).then(function(responseData) {
				vm.friends = responseData;
				$ionicLoading.hide();
				return responseData;
			});
		}

	}
})();