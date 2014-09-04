angular.module('eventool.controllers')

.controller('ClientShowCtrl', function($scope, $stateParams, $ionicPopup, $state, orderByFilter, Client, Event, Ticket, ClientComment) {
	$scope.selectedEvent = {};

	Client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});

	Event.index().then(function(events){
		$scope.events = orderByFilter(events, '-when');
		$scope.selectedEvent.id = $scope.events[0].id;
	});

	Ticket.index($stateParams.clientId).then(function(responseData) {
		$scope.tickets = responseData;
	});

	ClientComment.index($stateParams.clientId).then(function(responseData) {
		$scope.comments = responseData;
	});

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

	$scope.deleteClient = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Client',
			template: 'Are you sure you want to delete ' + $scope.client.name + '?',
			okText: 'Yes'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Client.delete($scope.client);
				$state.go('app.clients');
			}
		});
	};

	$scope.addComment = function(){
		ClientComment.create($stateParams.clientId, {comment: $scope.client.newComment});
		ClientComment.index($stateParams.clientId).then(function(responseData) {
			$scope.comments = responseData;
			$scope.client.newComment = '';		
		});
	};

	$scope.deleteComment = function  (index) {
		ClientComment.delete($scope.comments[index]).then(function(res){
			$scope.comments.splice(index, 1);
		});
		
	};
})