angular.module('eventool.controllers')
.controller('AppCtrl', function($scope, auth) {

	$scope.user = auth.getUser().user;

})