(function() {
	'use strict';

	angular
	.module('eventool.users')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.users', {
			url: "/users",
			views: {
				'tab-workers' :{
					controller:  "UserIndexCtrl",
					templateUrl: "app/users/indexUsers.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer']);
						}]
					}              
				}
			}         
		})
		.state('app.showUser', {
			url: "/user/:userId",
			views: {
				'tab-workers' :{
					controller:  "UserShowCtrl as vm",
					templateUrl: "app/users/showUser.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer']);
						}]
					}              
				}
			}         
		})
		.state('app.updateUser', {
			url: "/user/update/:userId",
			views: {
				'tab-workers' :{
					controller:  "UserUpdateCtrl",
					templateUrl: "app/users/editUser.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer']);
						}]
					}              
				}
			}         
		})
		
	}

})();