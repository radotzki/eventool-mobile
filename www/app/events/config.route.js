(function() {
	'use strict';

	angular
	.module('eventool.events')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.events', {
			url: "/events",
			views: {
				'tab-events' :{
					controller:  "IndexEvents as vm",
					templateUrl: "app/events/indexEvents.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter']);
						}]
					}
				}
			}         
		})
		.state('app.eventShow', {
			url: "/event/:eventId",
			views: {
				'tab-events' :{
					controller:  "ShowEvent as vm",
					templateUrl: "app/events/showEvent.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter']);
						}]
					}            
				}
			}          
		}) 
		.state('app.eventCreate', {
			url: "/events/create",
			views: {
				'tab-events' :{
					controller:  "EventCreateCtrl",
					templateUrl: "app/events/createEvent.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer']);
						}]
					}             
				}
			}          
		})  
		.state('app.eventUpdate', {
			url: "/event/update/:eventId",
			views: {
				'tab-events' :{
					controller:  "EventUpdateCtrl",
					templateUrl: "app/events/editEvent.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer']);
						}]
					}              
				}
			}          
		}) 
		.state('app.eventDelete', {
			url: "/event/delete/:eventId",
			views: {
				'tab-events' :{
					controller:  "EventDeleteCtrl",
					templateUrl: "app/events/delete.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer']);
						}]
					}              
				}
			}          
		});
		
	}

})();