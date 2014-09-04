angular.module('eventool.controllers', []);
angular.module('eventool.services', ['http-auth-interceptor', 'restangular']);
angular.module('eventool.directives', []);

angular.module('eventool', 
  ['ionic','ui.bootstrap.datetimepicker',
  'eventool.services', 'eventool.controllers', 'eventool.directives'])


.config(function(RestangularProvider) {
  // define an host url
  // localhost: http://localhost:3000/api/v1
  // dev: http://eventool-dev.herokuapp.com/api/v1
  // test: http://eventool-test.herokuapp.com/api/v1
  // prod: http://eventool.herokuapp.com/api/v1

  RestangularProvider.setBaseUrl('http://localhost:3000/api/v1');
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
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.home', {
    url: "/home",
    views: {
     'menuContent' :{
       controller:  "HomeCtrl",
       templateUrl: "templates/home.html"            	
     }
   }      	  
 })
  .state('app.signup', {
    url: "/signup",
    views: {
     'menuContent' :{
       controller:  "SignupCtrl",
       templateUrl: "templates/signup.html"             
     }
   }          
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
 .state('app.logout', {
  url: "/logout",
  views: {
    'menuContent' :{
     controller: "LogoutCtrl"
   }
 } 
});
 $urlRouterProvider.otherwise("/app/home");
})
