(function() {
	'use strict';

	angular
	.module('eventool.events')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.events', {
			abstract: true,
			url: "/events",
			views: {
				'tab-events': { template: '<ion-nav-view></ion-nav-view>' }
			},
			resolve: {
				user: ['auth', function(auth) {
					return auth.stateAuth(['producer', 'promoter']);
				}]
			}         
		})

		.state('app.events.index', {
			url: "",
			controller:  "IndexEvents as vm",
			templateUrl: "app/events/indexEvents.html",
		})

		.state('app.events.detail', {
			url: "/:eventId",
			controller:  "ShowEvent as vm",
			templateUrl: "app/events/showEvent.html",
			data: { name: null },
			resolve: {
				eventPrepSvc: getEvent,
				ticketsPrepSvc: getEventTickets
			}
		})

		.state('app.events.detail.tickets', {
			url: "/tickets",
			controller: "IndexTickets as vm",
			templateUrl: "app/tickets/indexTickets.html",
			data: { target: "user", name: "tickets" }
		})

		.state('app.events.create', {
			url: "",
			controller:  "CreateEvent as vm",
			templateUrl: "app/events/createEvent.html",
			resolve: {
				user: ['auth', function(auth) {
					return auth.stateAuth(['producer']);
				}]
			}
		})

		.state('app.events.update', {
			url: "/update/:eventId",
			controller:  "EditEvent as vm",
			templateUrl: "app/events/editEvent.html",
			resolve: {
				user: ['auth', function(auth) {
					return auth.stateAuth(['producer']);
				}]
			}
		});
		
	}

	/* @ngInject */
	function getEvent ($stateParams, datacontext) {
		return datacontext.event.show($stateParams.eventId);
	}

	/* @ngInject */
	function getEventTickets ($stateParams, datacontext) {
		return datacontext.event.getTickets($stateParams.eventId);
	}

})();