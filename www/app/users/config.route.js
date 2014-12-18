(function() {
	'use strict';

	angular
	.module('eventool.users')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.users', {
			abstract: true,
			url: "/users",
			views: {
				'tab-workers': { template: '<ion-nav-view></ion-nav-view>' }
			},
			resolve: {
				user: ['auth', function(auth) {
					return auth.stateAuth(['producer']);
				}]
			}         
		})

		.state('app.users.index', {
			url: "",
			controller:  "IndexUsers as vm",
			templateUrl: "app/users/indexUsers.html"
		})

		.state('app.users.detail', {
			url: "/:userId",
			controller:  "ShowUser as vm",
			templateUrl: "app/users/showUser.html",
			data: { name: null },
			resolve: {
				userPrepSvc: getUser,
				ticketsPrepSvc: getUserTickets
			}
		})

		.state('app.users.detail.tickets', {
			url: "/tickets",
			controller: "IndexTickets as vm",
			templateUrl: "app/tickets/indexTickets.html",
			data: { target: "user", name: "tickets" }
		})

		.state('app.users.update', {
			url: "/update/:userId",
			controller:  "EditUser as vm",
			templateUrl: "app/users/editUser.html"
		});

	}

	/* @ngInject */
	function getUser ($stateParams, datacontext) {
		return datacontext.user.show($stateParams.userId);
	}

	/* @ngInject */
	function getUserTickets ($stateParams, datacontext) {
		return datacontext.user.getTickets($stateParams.userId);
	}

})();