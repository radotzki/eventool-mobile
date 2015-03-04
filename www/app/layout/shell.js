(function() {
	'use strict';

	angular
		.module('eventool.layout')
		.controller('Shell', Shell);

	/* @ngInject */
	function Shell($rootScope, $ionicLoading, auth) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = 'Shell';

		vm.canView = canView;

		function canView () {
			return auth.getUser().user.role !== 'cashier';
		}

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$ionicLoading.show();
		});

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$ionicLoading.hide();
		});

	}
})();