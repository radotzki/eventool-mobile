(function() {
	'use strict';

	angular
	.module('eventool.tickets')
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

  
  .state('app.showTicket', {
    url: "/ticket/:ticketId/:clientId",
    views: {
      'menuContent' :{
        controller:  "TicketShowCtrl",
        templateUrl: "app/tickets/showTicket.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.createTicket', {
    url: "/ticket/create/:clientId/",
    views: {
      'menuContent' :{
        controller:  "TicketCreateCtrl",
        templateUrl: "app/tickets/createTicket.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.updateTicket', {
    url: "/ticket/update/:clientId/:ticketId/",
    views: {
      'menuContent' :{
        controller:  "TicketUpdateCtrl",
        templateUrl: "app/tickets/editTicket.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
		
	}

})();