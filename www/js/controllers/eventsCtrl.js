angular.module('eventool.controllers')

.controller('EventsCtrl', function($scope, Event, Restangular) {
 

  // Get tickets
  Event.show(2).then(function (responseData) {
    Event.getTickets(responseData).then(function (responseData) {
      $scope.customers = responseData;
    }, function() {
      console.log("There was an error");
    });
  });
})