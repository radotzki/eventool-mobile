(function() {
	'use strict';

	angular
	.module('eventool.session')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('login', {
			url: "/login",
			controller: "Login as vm",
			templateUrl: "app/session/login.html"
		})
		.state('logout', {
			url: "/logout",
			controller: "Logout"
		})
		.state('createUser', {
			url: "/users/create",
			controller:  "UserCreateCtrl",
			templateUrl: "app/session/userSignup.html"                     
		})
		.state('createProduction', {
			url: "/productions/create",
			controller:  "ProductionCreateCtrl",
			templateUrl: "app/session/productionSignup.html"                     
		})
		
	}

})();