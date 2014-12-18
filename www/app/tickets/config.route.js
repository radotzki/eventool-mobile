(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider


    .state('app.createTicket', {
      url: "/ticket/create/:clientId/",
      views: {
        'tab-clients' :{
          controller:  "TicketCreateCtrl",
          templateUrl: "app/tickets/createTicket.html",
          resolve: {
            user: ['auth', function(auth) {
              return auth.stateAuth(['producer', 'promoter']);
            }]
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
            user: ['auth', function(auth) {
              return auth.stateAuth(['producer', 'promoter']);
            }]
          }              
        }
      }         
    });

  }

})();