angular.module('eventool.layout')
.controller('Shell', function($scope, auth) {

	var user = auth.getUser();

	$scope.user = user ? user.user : null;

})