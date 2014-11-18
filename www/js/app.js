angular.module('eventool.controllers', []);
angular.module('eventool.services', ['http-auth-interceptor', 'restangular']);
angular.module('eventool.directives', []);

angular.module('eventool', 
  ['ionic','ui.bootstrap.datetimepicker',
  'eventool.services', 'eventool.controllers', 'eventool.directives'])

// ios-sim launch platforms/ios/build/emulator/Eventool.app --devicetypeid "com.apple.CoreSimulator.SimDeviceType.iPhone-6, 8.1"
.config(function(RestangularProvider) {
  // define an host url
  // localhost: http://localhost:3000/api/v1
  // dev: http://amitay.cloudapp.net:3000/api/v1
  // test: http://eventool-test.herokuapp.com/api/v1
  // prod: http://amitay.cloudapp.net/api/v1

  RestangularProvider.setBaseUrl('http://amitay.cloudapp.net:3000/api/v1');
})

.run(function($rootScope, $ionicPlatform, $http) {

	$ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/session/menu.html",
    controller: 'AppCtrl'
  })
  // Event
  .state('app.events', {
    url: "/events",
    views: {
     'menuContent' :{
       controller:  "EventIndexCtrl",
       templateUrl: "templates/events/index.html"            	
     }
   }      	  
 })
  .state('app.eventShow', {
    url: "/event/:eventId",
    views: {
     'menuContent' :{
       controller:  "EventShowCtrl",
       templateUrl: "templates/events/show.html"             
     }
   }          
 }) 
  .state('app.eventCreate', {
    url: "/events/create",
    views: {
     'menuContent' :{
       controller:  "EventCreateCtrl",
       templateUrl: "templates/events/create.html"             
     }
   }          
 })  
  .state('app.eventUpdate', {
    url: "/event/update/:eventId",
    views: {
     'menuContent' :{
       controller:  "EventUpdateCtrl",
       templateUrl: "templates/events/update.html"             
     }
   }          
 }) 
  .state('app.eventDelete', {
    url: "/event/delete/:eventId",
    views: {
     'menuContent' :{
       controller:  "EventDeleteCtrl",
       templateUrl: "templates/events/delete.html"             
     }
   }          
 }) 
 // Users
 .state('app.users', {
  url: "/users",
  views: {
    'menuContent' :{
      controller:  "UserIndexCtrl",
      templateUrl: "templates/users/index.html"             
    }
  }         
})
 .state('app.showUser', {
  url: "/user/:userId",
  views: {
    'menuContent' :{
      controller:  "UserShowCtrl",
      templateUrl: "templates/users/show.html"             
    }
  }         
})
 .state('app.updateUser', {
  url: "/user/update/:userId",
  views: {
    'menuContent' :{
      controller:  "UserUpdateCtrl",
      templateUrl: "templates/users/update.html"             
    }
  }         
})
 .state('app.createUser', {
  url: "/users/create",
  views: {
   'menuContent' :{
     controller:  "UserCreateCtrl",
     templateUrl: "templates/users/create.html"             
   }
 }          
})
 // Clients
 .state('app.clients', {
  url: "/clients",
  views: {
    'menuContent' :{
      controller:  "ClientIndexCtrl",
      templateUrl: "templates/clients/index.html"             
    }
  }         
})
 .state('app.showClient', {
  url: "/client/:clientId",
  views: {
    'menuContent' :{
      controller:  "ClientShowCtrl",
      templateUrl: "templates/clients/show.html"             
    }
  }         
})
 .state('app.createClient', {
  url: "/clients/create",
  views: {
    'menuContent' :{
      controller:  "ClientCreateCtrl",
      templateUrl: "templates/clients/create.html"             
    }
  }         
})
 .state('app.updateClient', {
  url: "/clients/update/:clientId",
  views: {
    'menuContent' :{
      controller:  "ClientUpdateCtrl",
      templateUrl: "templates/clients/update.html"             
    }
  }         
})
 // Tickets
 .state('app.showTicket', {
  url: "/ticket/:ticketId/:clientId",
  views: {
    'menuContent' :{
      controller:  "TicketShowCtrl",
      templateUrl: "templates/tickets/show.html"             
    }
  }         
})
 .state('app.createTicket', {
  url: "/ticket/create/:clientId/",
  views: {
    'menuContent' :{
      controller:  "TicketCreateCtrl",
      templateUrl: "templates/tickets/create.html"             
    }
  }         
})
 .state('app.updateTicket', {
  url: "/ticket/update/:clientId/:ticketId/",
  views: {
    'menuContent' :{
      controller:  "TicketUpdateCtrl",
      templateUrl: "templates/tickets/update.html"             
    }
  }         
})
// Productions
.state('app.createProduction', {
  url: "/productions/create",
  views: {
    'menuContent' :{
      controller:  "ProductionCreateCtrl",
      templateUrl: "templates/production/create.html"             
    }
  }         
})
.state('app.logout', {
  url: "/logout",
  views: {
    'menuContent' :{
     controller: "LogoutCtrl"
   }
 } 
});
$urlRouterProvider.otherwise("/app/clients");
})
