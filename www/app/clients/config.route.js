(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){

		$stateProvider

		.state('app.clients', {
			abstract: true,
			url: "/clients",
			views: {
				'tab-clients': { template: '<ion-nav-view></ion-nav-view>' }
			},
			resolve: {
				user: ['auth', function(auth) {
					return auth.stateAuth(['producer', 'promoter', 'cashier']);
				}]
			}         
		})

		.state('app.clients.index', {
			url: "",
			controller:  "IndexClients as vm",
			templateUrl: "app/clients/indexClients.html"
		})

		.state('app.clients.detail', {
			url: "/:clientId",
			controller:  "ShowClient as vm",
			templateUrl: "app/clients/showClient.html",
			data: { name: null },
			resolve: {
				ticketsPrepSvc: getTickets,
				clientPrepSvc: getClient,
				friendsCountPrepSvc: getFriendsCount
			}
		})

		.state('app.clients.detail.tickets', {
			url: "/tickets",
			data: { target: "client", name: 'tickets' },
			views: {
				'create': {
					template: '<et-add-ticket> </et-add-ticket>'
				},
				'index': {
					controller: "IndexTickets as vm",
					templateUrl: "app/tickets/indexTickets.html"
				}
			}
		})

		.state('app.clients.detail.comments', {
			url: "/comments",
			data: { name: "comments" },
			views: {
				'create': {
				},
				'index': {
					controller: "IndexComments as vm",
					templateUrl: "app/comments/indexComments.html",
					resolve: {
						commentsPrepSvc: getComments
					}
				}
			}
		})

		.state('app.clients.detail.friends', {
			url: "/friends",
			data: { name: "friends" },
			views: {
				'create': {
				},
				'index': {
					controller: "IndexFriends as vm",
					templateUrl: 'app/friendships/indexFriends.html',
					resolve: {
						friendsPrepSvc: getFriends
					}
				}
			}
		})

		.state('app.clients.create', {
			url: "",
			controller:  "CreateClient as vm",
			templateUrl: "app/clients/createClient.html"
		})

		.state('app.clients.update', {
			url: "/update/:clientId",
			controller:  "EditClient as vm",
			templateUrl: "app/clients/editClient.html",
			resolve: {
				user: ['auth', function(auth) {
					return auth.stateAuth(['producer', 'promoter']);
				}]
			}
		});
		
	}

	/* @ngInject */
	function getTickets ($stateParams, datacontext) {
		return datacontext.ticket.index($stateParams.clientId);
	}

	/* @ngInject */
	function getClient ($stateParams, datacontext) {
		return datacontext.client.show($stateParams.clientId);
	}

	/* @ngInject */
	function getFriendsCount ($stateParams, datacontext) {
		return datacontext.friendship.count($stateParams.clientId);
	}

	/* @ngInject */
	function getComments ($stateParams, datacontext) {
		return datacontext.clientComment.index($stateParams.clientId);
	}

	/* @ngInject */
	function getFriends ($stateParams, datacontext) {
		return datacontext.friendship.index($stateParams.clientId);
	}

})();