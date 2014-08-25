angular.module('eventool.controllers')

.controller('UsersCtrl', function($scope, User) {

  Users.index().then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  Users.show(1).then(function(responseData) {
    $scope.customers = responseData;
  }, function() {
    console.log("There was an error");
  });

  // var userParams = {
  //   production_id: 1,
  //   first_name: "Test",
  //   last_name: "me",
  //   email: "te@we.com",
  //   password: "12345678"
  // };

  // // Create
  // Users.create(userParams).then(function() {
  //   console.log("entity created");
  // }, function() {
  //   console.log("There was an error");
  // });

  // // Update
  // someuser.first_name = "Edited";
  // Users.update(someuser).then(function() {
  //   console.log("user updated"); 
  // }, function() {
  //   console.log("There was an error");
  // });

  // // Delete
  // Users.delete(newUser).then(function() {
  //   console.log("entity deleted");
  // }, function() {
  //   console.log("There was an error");
  // }); 

  // Users.show(7).then(function (responseData) {
  //   Users.getTickets(responseData);
  // });

  // Users.show(7).then(function (responseData) {
  //   Users.unlock(responseData);
  // });

  // Users.show(1).then(function (responseData) {
  //     Users.changeRole(responseData, "cashier");
  //   });
})