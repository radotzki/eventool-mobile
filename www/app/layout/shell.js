(function() {
	'use strict';

	angular
	.module('eventool.layout')
	.controller('Shell', Shell);

	/* @ngInject */
	function Shell($ionicNavBarDelegate, auth) {
		/*jshint validthis: true */
		var vm = this;

		vm.getPreviousTitle = getPreviousTitle;

		function getPreviousTitle() {
			return $ionicNavBarDelegate.getPreviousTitle();
		};

	}
})();