angular.module('eventool.controllers')

.controller('ClientsCtrl', function($scope, Client) {
  // Search
  // Client.search({search_param: "May"}).then(function(responseData) {
  // 	$scope.clients = responseData;
  // }, function() {
  // 	console.log("There was an error");
  // });

  $scope.search = function() {
	  Client.search({search_param: $scope.searchParam}).then(function(responseData) {
	  	$scope.clients = responseData;
	  }, function() {
	  	console.log("There was an error");
	  });  	
  };
})