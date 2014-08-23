angular.module('ionic-http-auth.services', ['http-auth-interceptor'])
.factory('AuthenticationService', function($rootScope, $http, authService) {
  var service = {
    login: function(user) {
      $http.post('http://localhost:3000/api/v1/login', { email: user.email, password: user.password}, { ignoreAuthModule: true })
      .success(function (data, status, headers, config) {
    	  $http.defaults.headers.common.token = data.auth_token;
        
        authService.loginConfirmed(data, function(config) { 
          config.headers.token = data.auth_token;
          return config;
        });
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('event:auth-login-failed', status);
      });
    },
    logout: function(user) {
      delete $http.defaults.headers.common.token;
      $rootScope.$broadcast('event:auth-logout-complete');		
    },	
    loginCancelled: function() {
      authService.loginCancelled();
    }
  };
  return service;
})