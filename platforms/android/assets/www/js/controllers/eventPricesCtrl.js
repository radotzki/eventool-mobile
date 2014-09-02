angular.module('eventool.controllers')

.controller('EventPricesCtrl', function($scope, Client) {

  EventPrice.index(1).then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  EventPrice.show(1, 3).then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  // EventPrice.create(1, {price: 3});

  // EventPrice.show(1, 3).then(function(responseData) {
  //   responseData.price = 1;
  //   EventPrice.update(responseData);
  // }, function() {
  //   console.log("There was an error");
  // });

  // EventPrice.show(1, 9).then(function(responseData) {
  //   EventPrice.delete(responseData);
  // }, function() {
  //   console.log("There was an error");
  // });

})