(function() {
	'use strict';

	angular
	.module('eventool.session')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.login', {
			url: "/login",
			views: {
				'menuContent' :{
					controller: "Login as vm",
					templateUrl: "app/session/login.html"
				}
			}
		})
		.state('app.logout', {
			url: "/logout",
			views: {
				'menuContent' :{
					controller: "Logout"
				}
			} 
		})
		.state('app.createUser', {
			url: "/users/create",
			views: {
				'menuContent' :{
					controller:  "UserCreateCtrl",
					templateUrl: "app/session/userSignup.html"            
				}
			}          
		})
		.state('app.createProduction', {
			url: "/productions/create",
			views: {
				'menuContent' :{
					controller:  "ProductionCreateCtrl",
					templateUrl: "app/session/productionSignup.html"             
				}
			}         
		})
		
	}

})();