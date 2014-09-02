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
  // Event
  .state('app.events', {
    url: "/events",
    views: {
     'menuContent' :{
       controller:  "EventsIndexCtrl",
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
 // Workers
  .state('app.workers', {
    url: "/workers",
    views: {
      'menuContent' :{
        controller:  "UsersCtrl",
        templateUrl: "templates/workers.html"             
      }
    }         
  })
  .state('app.clients', {
    url: "/clients",
    views: {
      'menuContent' :{
        controller:  "ClientsCtrl",
        templateUrl: "templates/clients.html"             
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
