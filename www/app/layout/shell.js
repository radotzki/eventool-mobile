(function() {
	'use strict';

	angular
		.module('eventool.layout')
		.controller('Shell', Shell);

	/* @ngInject */
	function Shell($rootScope, $ionicLoading) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = 'Shell';

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$ionicLoading.show();
		});

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$ionicLoading.hide();
		});

	}
})();