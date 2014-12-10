(function() {
	'use strict';

	angular
	.module('eventool.layout')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "app/layout/shell.html",
			controller: 'Shell'
		})
		
	}

})();