angular.module('eventool.controllers')

.controller('ProductionsCtrl', function($scope, Production) {

  Production.index().then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  Production.show(1).then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  // var params = {
  //   production_id: 1,
  //   first_name: "Test",
  //   last_name: "me",
  //   email: "te@we.com",
  //   password: "12345678"
  // };

  // // Create
  // Production.create(params).then(function() {
  //   console.log("entity created");
  // }, function() {
  //   console.log("There was an error");
  // });

  // // Update
  // someuser.first_name = "Edited";
  // Production.update(someuser).then(function() {
  //   console.log("user updated"); 
  // }, function() {
  //   console.log("There was an error");
  // });

  // // Delete
  // Production.delete(newUser).then(function() {
  //   console.log("entity deleted");
  // }, function() {
  //   console.log("There was an error");
  // }); 
})