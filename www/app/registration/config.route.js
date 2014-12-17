(function() {
	'use strict';

	angular
	.module('eventool.registration')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('registerUser', {
			url: "/register/user",
			controller:  "RegisterUser as vm",
			templateUrl: "app/registration/registerUser.html"                     
		})
		.state('registerProduction', {
			url: "/register/production",
			controller:  "RegisterProduction as vm",
			templateUrl: "app/registration/registerProduction.html"                     
		});
		
	}

})();