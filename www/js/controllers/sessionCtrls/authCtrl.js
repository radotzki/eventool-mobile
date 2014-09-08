angular.module('eventool.controllers')
.controller('LoginCtrl', function($scope, $http, $state, AuthenticationService) {
  $scope.message = "";
  
  $scope.user = {
    username: null,
    password: null
  };

  $scope.login = function() {
    AuthenticationService.login($scope.user);
  };

  $scope.signup = function() {
    $scope.username = null;
    $scope.password = null;
    $scope.loginModal.hide();
    $state.go('app.signup');
  };

  $scope.$on('event:auth-loginRequired', function(e, rejection) {
    $scope.loginModal.show();
  });

  $scope.$on('event:auth-loginConfirmed', function() {
    $scope.username = null;
    $scope.password = null;
    $scope.loginModal.hide();
  });
  
  $scope.$on('event:auth-login-failed', function(e, status) {
    var error = "Login failed.";
    if (status == 401) {
      error = "Invalid Username or Password.";
    }
    $scope.message = error;
  });

  $scope.$on('event:auth-logout-complete', function() {
    $state.go('app.clients', {}, {reload: true, inherit: false});
  });    	
})

.controller('LogoutCtrl', function($scope, AuthenticationService) {
  AuthenticationService.logout();
})

