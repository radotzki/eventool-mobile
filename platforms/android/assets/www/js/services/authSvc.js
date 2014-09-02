angular.module('eventool.services')
.factory('AuthenticationService', function($rootScope, $http, authService, Restangular) {
  var service = {
    login: function(user) {
      $http.post(Restangular.configuration.baseUrl + '/login', { email: user.email, password: user.password}, { ignoreAuthModule: true })
      .success(function (data, status, headers, config) {
       $http.defaults.headers.common.token = data.auth_token;
       localStorage.setItem('token', data.auth_token);
       
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
      localStorage.removeItem('token');
      delete $http.defaults.headers.common.token;
      $rootScope.$broadcast('event:auth-logout-complete');		
    },	
    loginCancelled: function() {
      authService.loginCancelled();
    }
  };
  return service;
})