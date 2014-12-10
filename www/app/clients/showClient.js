angular.module('eventool.clients')

.controller('ClientShowCtrl', function($scope, $stateParams, $ionicPopup, $window, $ionicSlideBoxDelegate,
	orderByFilter, Client, Event, Ticket, ClientComment, Friendship, user) {

	$scope.ticketsByEvents = [];
	$scope.arrivedCount = 0;
	$scope.ticketsCount = 0;
	$scope.user = user;

	Client.show($stateParams.clientId).then(function(data){
		$scope.client = data;
	});

	if(user.role!='cashier'){

		Friendship.index($stateParams.clientId).then(function(friends){
			$scope.friends = friends;
		})

		Ticket.index($stateParams.clientId).then(function(tickets) {
			loadTickets(tickets);
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

	function loadTickets(tickets){
		$scope.ticketsCount = tickets.length;
		for(var i=0; i<tickets.length;i++){
			if(tickets[i].arrived){
				$scope.arrivedCount++;
			}

			var event = findEventByName(tickets[i].event.name);
			if ( event != -1 ){
				$scope.ticketsByEvents[event].tickets.push(tickets[i]);
				$scope.ticketsByEvents[event].arriveCount += tickets[i].arrived;	
			}
			else {
				$scope.ticketsByEvents.push({
					tickets: [tickets[i]],
					arriveCount: tickets[i].arrived,
					when: tickets[i].event.when,
					eventName: tickets[i].event.name
				});	
			}
		}
	}

	function findEventByName(name){
		var res = -1;
		for(var i=0; i < $scope.ticketsByEvents.length; i++){
			if ( $scope.ticketsByEvents[i].eventName == name )
				return i;
		}
		return res;
	}

	$scope.eventPass = function(event) {
		return (new Date(event.when)) < Date.now();
	};

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
					comment: res, created_at: new Date().toString(), user: user, newComment: true
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