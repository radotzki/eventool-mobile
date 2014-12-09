angular.module('eventool.controllers', []);
angular.module('eventool.services', ['restangular']);
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
      StatusBar.styleDefault();
    }
  });
})

.run(stateChangeError)

.config(stateConfig)

/* @ngInject */
function stateChangeError($rootScope, $state){
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    if ( !error.authenticated ) {
      $state.go("app.login");
    }
  });
}

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
function stateConfig($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/app/clients");

  $stateProvider
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/session/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.events', {
    url: "/events",
    views: {
     'menuContent' :{
       controller:  "EventIndexCtrl",
       templateUrl: "templates/events/index.html",
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
       templateUrl: "templates/events/show.html",
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
       templateUrl: "templates/events/create.html",
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
       templateUrl: "templates/events/update.html",
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
       templateUrl: "templates/events/delete.html",
       resolve: {
        user: generalAuth
      }              
    }
  }          
}) 
  .state('app.users', {
    url: "/users",
    views: {
      'menuContent' :{
        controller:  "UserIndexCtrl",
        templateUrl: "templates/users/index.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.showUser', {
    url: "/user/:userId",
    views: {
      'menuContent' :{
        controller:  "UserShowCtrl as vm",
        templateUrl: "templates/users/show.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.updateUser', {
    url: "/user/update/:userId",
    views: {
      'menuContent' :{
        controller:  "UserUpdateCtrl",
        templateUrl: "templates/users/update.html",
        resolve: {
          user: generalAuth
        }              
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
  .state('app.clients', {
    url: "/clients",
    views: {
      'menuContent' :{
        controller:  "ClientIndexCtrl",
        templateUrl: "templates/clients/index.html",
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
        templateUrl: "templates/clients/show.html",
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
        templateUrl: "templates/clients/create.html",
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
        templateUrl: "templates/clients/update.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.showTicket', {
    url: "/ticket/:ticketId/:clientId",
    views: {
      'menuContent' :{
        controller:  "TicketShowCtrl",
        templateUrl: "templates/tickets/show.html",
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
        templateUrl: "templates/tickets/create.html",
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
        templateUrl: "templates/tickets/update.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.selectNewFriend', {
    url: "/friendship/select/:clientId/",
    views: {
      'menuContent' :{
        controller:  "SelectNewFriendCtrl",
        templateUrl: "templates/friendship/select.html",
        resolve: {
          user: generalAuth
        }              
      }
    }         
  })
  .state('app.createProduction', {
    url: "/productions/create",
    views: {
      'menuContent' :{
        controller:  "ProductionCreateCtrl",
        templateUrl: "templates/production/create.html"             
      }
    }         
  })
  .state('app.login', {
    url: "/login",
    views: {
      'menuContent' :{
       controller: "Login as vm",
       templateUrl: "session/login.html"
     }
   }
 })
  .state('app.logout', {
    url: "/logout",
    views: {
      'menuContent' :{
       controller: "Logout"
     }
   } 
 });
}