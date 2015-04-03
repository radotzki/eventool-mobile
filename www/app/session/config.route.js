(function() {
	'use strict';

	angular
	.module('eventool.session')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('login', {
			url: "/login/{msg}",
			controller: "Login as vm",
			templateUrl: "app/session/login.html"
		});
		
	}

})();