(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){

		$stateProvider

		.state('app.clients', {
			url: "/clients",
			views: {
				'tab-clients' :{
					controller:  "IndexClients as vm",
					templateUrl: "app/clients/indexClients.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter', 'cashier']);
						}]
					}             
				}
			}         
		})
		.state('app.showClient', {
			url: "/client/:clientId",
			views: {
				'tab-clients' :{
					controller:  "ShowClient as vm",
					templateUrl: "app/clients/showClient.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter', 'cashier']);
						}]
					}              
				}
			}         
		})
		.state('app.createClient', {
			url: "/clients/create",
			views: {
				'tab-clients' :{
					controller:  "CreateClient as vm",
					templateUrl: "app/clients/createClient.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter', 'cashier']);
						}]
					}              
				}
			}         
		})
		.state('app.updateClient', {
			url: "/clients/update/:clientId",
			views: {
				'tab-clients' :{
					controller:  "EditClient as vm",
					templateUrl: "app/clients/editClient.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter']);
						}]
					}              
				}
			}         
		});
		
	}

})();