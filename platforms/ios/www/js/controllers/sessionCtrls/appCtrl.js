angular.module('eventool.controllers')
.controller('AppCtrl', function($scope, $state, $ionicModal, User) {

  $ionicModal.fromTemplateUrl('templates/session/login.html', function(modal) {
    $scope.loginModal = modal;
  },
  {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }
  );
  //Be sure to cleanup the modal by removing it from the DOM
  $scope.$on('$destroy', function() {
    $scope.loginModal.remove();
  });


  User.currentUser().then(function(responseData) {
    $scope.curUser = responseData;
  });


})