angular.module('eventool.controllers')

.controller('ClientShowCtrl', function($scope, $stateParams, $ionicPopup, $window, $ionicSlideBoxDelegate,
	orderByFilter, Client, Event, Ticket, ClientComment, Friendship) {

	Client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});
	
	$scope.getCurrentUser().then(function(curUser) {
		if(curUser.role!='cashier'){

			Friendship.index($stateParams.clientId).then(function(friends){
				$scope.friends = friends;
			})

			Ticket.index($stateParams.clientId).then(function(tickets) {
				$scope.tickets = tickets;
				$scope.events = {};
				$scope.arrivedCount = 0;

				for(i=0; i<tickets.length;i++){
					if(tickets[i].arrived){
						$scope.arrivedCount++;
					}
					if ( $scope.events[tickets[i].event.name] ) {
						$scope.events[tickets[i].event.name].push(tickets[i]);
					}
					else {
						$scope.events[tickets[i].event.name] = [tickets[i]];
					}
				}
				console.log($scope.events)
			});

			ClientComment.index($stateParams.clientId).then(function(responseData) {
				$scope.comments = responseData;
			});
		}
		else{
			Ticket.currentEvent($stateParams.clientId).then(function(tickets){
				$scope.tickets = tickets;

				$scope.clientArrived = false;
				for(var i=0; i < tickets.length && !$scope.clientArrived; i++){
					if (tickets[i].arrived)
						$scope.clientArrived = true;
				}
			})
		}	
	});



$scope.eventPass = function(event) {
	return (new Date(event.when)) < Date.now();
};

$scope.eventOrder = function(eventName, tickets){
	console.log(eventName)
}

$scope.addComment = function(){
	$scope.data = {}

	var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="data.comment">',
		title: 'Say something about ' + $scope.client.name,
		scope: $scope,
		buttons: [
		{
			text: '<b>Save</b>',
			type: 'button-positive',
			onTap: function(e) {
				if (!$scope.data.comment) {
					e.preventDefault();
				} else {
					return $scope.data.comment;
				}
			}
		},
		]
	});
	myPopup.then(function(res) {
		ClientComment.create($stateParams.clientId, {comment: res}).then(function(){
			$scope.comments.push({ 
				comment: res, created_at: new Date().toString(), user: $scope.curUser, newComment: true
			});
			$scope.comments = orderByFilter($scope.comments, '-created_at');
			$scope.client.newComment = '';
		});
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

$scope.slideTo = function(index){
	$ionicSlideBoxDelegate.slide(index);
}

$scope.checkin = function(ticket){
	Ticket.checkin($stateParams.clientId, ticket.id).then(function(res){
		var alertPopup = $ionicPopup.alert({
			title: 'Saved!'
		});
		alertPopup.then(function(res) {
			$window.history.back();
		});
	});
};

})