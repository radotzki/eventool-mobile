angular.module('eventool.controllers')

.controller('EventShowCtrl', function($scope, Event, $stateParams, EventPrice, Client, orderByFilter) {
	Event.show($stateParams.eventId).then(function(data){
		$scope.event = data;

		$scope.eventPass = false;
		if ((new Date(data.when)) < Date.now()) {
			$scope.eventPass = true;
		}

		Event.getTickets(data).then(function (tickets) {
			$scope.tickets = tickets;
			$scope.tickets = orderByFilter($scope.tickets, ['client.first_name','-arrived']);

			// Statistic
			$scope.maleCount=0;
			$scope.femaleCount=0;
			$scope.maleArrived=0;
			$scope.femaleArrived=0;
			$scope.income=0;

			for(i=0; i<$scope.tickets.length;i++){
				if(i==0){
					$scope.tickets[i].client.gender == "male" ? $scope.maleCount++ : $scope.femaleCount++;
				}
				else if(i!=0 && $scope.tickets[i].client.id != $scope.tickets[i-1].client.id){
					$scope.tickets[i].client.gender == "male" ? $scope.maleCount++ : $scope.femaleCount++;
				}

				if($scope.tickets[i].arrived){
					$scope.income+=$scope.tickets[i].price.price;	
					$scope.tickets[i].client.gender == "male" ? $scope.maleArrived++ : $scope.femaleArrived++;				
				}
			}
		})

	});
})