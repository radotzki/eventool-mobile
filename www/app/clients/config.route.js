(function() {
	'use strict';

	angular
	.module('eventool.clients')
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

		.state('app.clients', {
			url: "/clients",
			views: {
				'menuContent' :{
					controller:  "ClientIndexCtrl",
					templateUrl: "app/clients/indexClients.html",
					resolve: {
						user: generalAuth
					}             
				}
			}         
		})
		.state('app.showClient', {
			url: "/client/:clientId",
			views: {
				'menuContent' :{
					controller:  "ClientShowCtrl",
					templateUrl: "app/clients/showClient.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		.state('app.createClient', {
			url: "/clients/create",
			views: {
				'menuContent' :{
					controller:  "ClientCreateCtrl",
					templateUrl: "app/clients/createClient.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		.state('app.updateClient', {
			url: "/clients/update/:clientId",
			views: {
				'menuContent' :{
					controller:  "ClientUpdateCtrl",
					templateUrl: "app/clients/editClient.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		
	}

})();