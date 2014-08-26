angular.module('eventool.controllers', []);
angular.module('eventool.services', ['http-auth-interceptor', 'restangular']);

angular.module('eventool', ['ionic', 'ngResource', 'eventool.services', 'eventool.controllers'])


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
  .state('app.events', {
    url: "/events",
    views: {
     'menuContent' :{
       controller:  "EventsCtrl",
       templateUrl: "templates/events.html"            	
     }
   }      	  
 })
  .state('app.workers', {
    url: "/workers",
    views: {
      'menuContent' :{
        controller:  "WorkersCtrl",
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
