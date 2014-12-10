(function() {
	'use strict';

	angular
	.module('eventool.events')
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

		.state('app.events', {
			url: "/events",
			views: {
				'menuContent' :{
					controller:  "EventIndexCtrl",
					templateUrl: "app/events/indexEvents.html",
					resolve: {
						user: generalAuth
					}
				}
			}         
		})
		.state('app.eventShow', {
			url: "/event/:eventId",
			views: {
				'menuContent' :{
					controller:  "EventShowCtrl",
					templateUrl: "app/events/showEvent.html",
					resolve: {
						user: generalAuth
					}            
				}
			}          
		}) 
		.state('app.eventCreate', {
			url: "/events/create",
			views: {
				'menuContent' :{
					controller:  "EventCreateCtrl",
					templateUrl: "app/events/createEvent.html",
					resolve: {
						user: generalAuth
					}             
				}
			}          
		})  
		.state('app.eventUpdate', {
			url: "/event/update/:eventId",
			views: {
				'menuContent' :{
					controller:  "EventUpdateCtrl",
					templateUrl: "app/events/editEvent.html",
					resolve: {
						user: generalAuth
					}              
				}
			}          
		}) 
		.state('app.eventDelete', {
			url: "/event/delete/:eventId",
			views: {
				'menuContent' :{
					controller:  "EventDeleteCtrl",
					templateUrl: "app/events/delete.html",
					resolve: {
						user: generalAuth
					}              
				}
			}          
		})
		
	}

})();