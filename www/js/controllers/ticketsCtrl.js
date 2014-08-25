angular.module('eventool.controllers')

.controller('TicketsCtrl', function($scope, User) {

  Ticket.index(1).then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  Ticket.show(1, 5).then(function(responseData) {
    // $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  // Ticket.create(1, {event_id: 1, event_price_id: 3});

  // Ticket.show(1, 10).then(function(responseData) {
  //   responseData.event_price_id = 1;
  //   Ticket.update(responseData);
  // }, function() {
  //   console.log("There was an error");
  // });

  // Ticket.show(1, 10).then(function(responseData) {
  //   Ticket.delete(responseData);
  // }, function() {
  //   console.log("There was an error");
  // });

  // Ticket.checkin(1,1);

})