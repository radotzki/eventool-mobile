(function() {
	'use strict';

	angular
	.module('eventool.users')
	.controller('IndexUsers', IndexUsers);

	/* @ngInject */
	function IndexUsers($ionicLoading, datacontext, actionSheet) {
		/*jshint validthis: true */
		var vm = this;

		var hideSheet;

		vm.users;
		vm.userToUnlock;
		vm.confirmUnlock = confirmUnlock;

		activate();

		function activate() {
			getUsers();
		}

		function getUsers () {
			$ionicLoading.show();
			return datacontext.user.index().then(function(resp) {
				$ionicLoading.hide();
				vm.users = resp;
				return resp;
			});
		}

		function confirmUnlock () {
			hideSheet = actionSheet.confirm(unlockUser);
		}

		function unlockUser () {
			hideSheet();
			$ionicLoading.show();
			datacontext.user.unlock(vm.userToUnlock).then(function(res){
				vm.userToUnlock.lock = false;
				$ionicLoading.hide();
			});
		}

	}
})();