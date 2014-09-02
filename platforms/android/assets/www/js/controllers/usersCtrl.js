angular.module('eventool.controllers')

.controller('UsersCtrl', function($scope, User) {

  User.index().then(function(responseData) {
    $scope.workers = responseData;
  }, function() {
    console.log("There was an error");
  });

  User.show(1).then(function(responseData) {
    $scope.workers = responseData;
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
  // User.create(userParams).then(function() {
  //   console.log("entity created");
  // }, function() {
  //   console.log("There was an error");
  // });

  // // Update
  // someuser.first_name = "Edited";
  // User.update(someuser).then(function() {
  //   console.log("user updated"); 
  // }, function() {
  //   console.log("There was an error");
  // });

  // // Delete
  // User.delete(newUser).then(function() {
  //   console.log("entity deleted");
  // }, function() {
  //   console.log("There was an error");
  // }); 

  // User.show(7).then(function (responseData) {
  //   User.getTickets(responseData);
  // });

  // User.show(7).then(function (responseData) {
  //   User.unlock(responseData);
  // });

  // User.show(1).then(function (responseData) {
  //     User.changeRole(responseData, "cashier");
  //   });
})