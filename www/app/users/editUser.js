(function() {
	'use strict';

	angular
	.module('eventool.users')
	.controller('EditUser', EditUser);

	/* @ngInject */
	function EditUser($ionicLoading, $state, $stateParams, datacontext, actionSheet) {
		/*jshint validthis: true */
		var vm = this;

		vm.user;
		vm.update = update;
		vm.confirmLock = confirmLock;

		activate();

		function activate() {
			getUser();
		}

		function getUser () {
			$ionicLoading.show();
			return datacontext.user.show($stateParams.userId).then(function(resp) {
				vm.user = resp;
				$ionicLoading.hide();
				return resp;
			});
		}

		function update () {
			$ionicLoading.show();
			datacontext.user.update(vm.user).then(function() {
				$ionicLoading.hide();
				$state.go('app.users.detail', {userId: vm.user.id});
			})
		}

		function confirmLock () {
			var msg = 'Are you sure you want to lock ' + vm.user.name + '?';
			actionSheet.confirm(lockUser, msg);
		}

		function lockUser () {
			$ionicLoading.show();
			datacontext.user.lock(vm.user).then(function() {
				$ionicLoading.hide();
				$state.go('app.users.index');
			})
		}

	}
})();