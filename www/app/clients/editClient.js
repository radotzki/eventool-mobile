(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('EditClient', EditClient);

	/* @ngInject */
	function EditClient($window, $state, $stateParams, datacontext) {
		/*jshint validthis: true */
		var vm = this;
		vm.client;
		vm.updateClient = updateClient;
		vm.deleteClient = deleteClient;

		activate();

		function activate() {
			console.log($stateParams.clientId)
			getClient();
		}

		function getClient() {
			return datacontext.client.show($stateParams.clientId).then(function(data){
				vm.client = data;
				return data;
			});
		}

		function updateClient() {
			datacontext.client.update(vm.client).then(function(res){
				$window.history.back();
			});
		}

		function deleteClient() {
			datacontext.client.remove(vm.client).then(function(res){
				$state.go('app.clients');
			});
		}

	}
})();