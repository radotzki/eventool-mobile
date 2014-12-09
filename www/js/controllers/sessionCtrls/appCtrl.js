angular.module('eventool.controllers')
.controller('AppCtrl', function($scope, auth) {

	var user = auth.getUser();

	$scope.user = user ? user.user : null;

})