angular.module('eventool.controllers')

.controller('ClientShowCtrl', function($scope, $stateParams, $ionicPopup, $window, orderByFilter, Client, Event, Ticket, ClientComment) {
	$scope.selectedEvent = {};

	Client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});

	// Event.index().then(function(events){
	// 	$scope.events = orderByFilter(events, '-when');
	// 	$scope.selectedEvent.id = $scope.events[0].id;
	// });

Ticket.index($stateParams.clientId).then(function(tickets) {
	$scope.tickets = tickets;

	$scope.arrivedCount = 0;
	for(i=0; i<tickets.length;i++){
		if(tickets[i].arrived){
			$scope.arrivedCount++;
		}
	}
});

ClientComment.index($stateParams.clientId).then(function(responseData) {
	$scope.comments = responseData;
});

$scope.eventPass = function(event) {
	return (new Date(event.when)) < Date.now();
};

$scope.addComment = function(){
	ClientComment.create($stateParams.clientId, {comment: $scope.client.newComment}).then(function(){
		$scope.comments.push({
			comment: $scope.client.newComment,
			created_at: new Date().toString(),
			user: $scope.curUser,
			newComment: true
		});
		$scope.comments = orderByFilter($scope.comments, '-created_at');
		$scope.client.newComment = '';
	});
};

$scope.deleteComment = function  (index) {
	ClientComment.delete($scope.comments[index]).then(function(res){
		$scope.comments.splice(index, 1);
	});
};

$scope.ticketsCountForEvent = function(tickets, eventId) {
	var count =0;
	if(tickets) {
		for(var i=0; i<tickets.length; i++) {
			if (tickets[i].event.id == eventId) 
				count++;
		}
	}
	return count;
}

})