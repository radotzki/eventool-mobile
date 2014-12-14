(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('EditClient', EditClient);

	/* @ngInject */
	function EditClient($window, $state, $stateParams, $ionicLoading, datacontext, actionSheet) {
		/*jshint validthis: true */
		var vm = this;
		vm.client;
		vm.updateClient = updateClient;
		vm.confirmDelete = confirmDelete;

		activate();

		function activate() {
			getClient();
		}

		function getClient() {
			return datacontext.client.show($stateParams.clientId).then(function(data){
				vm.client = data;
				return data;
			});
		}

		function updateClient() {
			$ionicLoading.show();
			datacontext.client.update(vm.client).then(function(res){
				$ionicLoading.hide();
				$window.history.back();
			});
		}

		function confirmDelete() {
			var msg = "This will delete " + vm.client.first_name + " " + vm.client.last_name;
			actionSheet.confirmDelete(deleteClient, msg);
		}

		function deleteClient() {
			$ionicLoading.show();
			datacontext.client.remove(vm.client).then(function(res){
				$ionicLoading.hide();
				$state.go('app.clients');
			});
		}

	}
})();