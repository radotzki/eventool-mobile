angular.module('eventool.controllers')

.controller('HomeCtrl', function($ionicViewService) {
 	// This a temporary solution to solve an issue where the back button is displayed when it should not be.
 	// This is fixed in the nightly ionic build so the next release should fix the issue
 	$ionicViewService.clearHistory();
 })

.controller('CustomerCtrl', function($scope, ClientComment, Ticket, EventPrice, ClientFriendship) {

  // ClientComment.index(1).then(function(responseData) {
  //   $scope.customers = responseData;
  // }, function() {
  //   console.log("There was an error");
  // });
})