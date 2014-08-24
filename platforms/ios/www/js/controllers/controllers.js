angular.module('eventool.controllers')

.controller('HomeCtrl', function($ionicViewService) {
 	// This a temporary solution to solve an issue where the back button is displayed when it should not be.
 	// This is fixed in the nightly ionic build so the next release should fix the issue
 	$ionicViewService.clearHistory();
 })

.controller('CustomerCtrl', function($scope, Users) {
  $scope.customers = [];
  var user = Users.get({ id: 2 }, function() {}); 
  // var user = Users.get({id: 2});
  var tickets = user.$getTickets;
  $scope.customers = tickets;
})

.controller('ResourceCtrl', function($scope, Entry) {
      // Check $resource
      // Show
      var entry = Entry.get({ id: 1 }, function() {
        $scope.entry = entry;
      }); // get() returns a single entry

      // Index
      var entries = Entry.query(function() {
        $scope.entries = entries;
      }); //query() returns all the entries

      // Create
      // $scope.entry = new Entry(); //You can instantiate resource class

      // $scope.entry.first_name = 'some data';
      // $scope.entry.last_name = 'some data';
      // $scope.entry.gender = 'male';

      // Entry.save($scope.entry, function() {
      //   //data saved. do something here.
      // }); //saves an entry. Assuming $scope.entry is the Entry object  

      // Update
      // $scope.entry = Entry.get({ id: 1 }, function() {
      //   $scope.entry.gender = 'male';
      //   $scope.entry.$update(function() {
      //     //updated in the backend
      //   });
      // });

      // Delete
      // $scope.entry = Entry.get({ id: 41}, function() {
      //   $scope.entry.$delete(function() {
      //     //gone forever!
      //   });
      // });
})