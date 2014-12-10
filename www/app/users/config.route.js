(function() {
	'use strict';

	angular
	.module('eventool.users')
	.config(stateConfig);

	/* @ngInject */
	function generalAuth($q, auth) {
		var user = auth.getUser();
		if (user) {
			return $q.when(user.user);
		} else {
			return $q.reject({ authenticated: false });
		}
	}

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.users', {
			url: "/users",
			views: {
				'menuContent' :{
					controller:  "UserIndexCtrl",
					templateUrl: "app/users/indexUsers.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		.state('app.showUser', {
			url: "/user/:userId",
			views: {
				'menuContent' :{
					controller:  "UserShowCtrl as vm",
					templateUrl: "app/users/showUser.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		.state('app.updateUser', {
			url: "/user/update/:userId",
			views: {
				'menuContent' :{
					controller:  "UserUpdateCtrl",
					templateUrl: "app/users/editUser.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		
	}

})();