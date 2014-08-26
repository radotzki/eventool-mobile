angular.module('eventool.controllers')
.controller('AppCtrl', function($scope, $state, $ionicModal, User) {

  $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
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


.controller('HomeCtrl', function($ionicViewService) {
   // This a temporary solution to solve an issue where the back button is displayed when it should not be.
   // This is fixed in the nightly ionic build so the next release should fix the issue
   $ionicViewService.clearHistory();
 })