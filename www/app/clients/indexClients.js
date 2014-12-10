(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('IndexClients', IndexClients);

	/* @ngInject */
	function IndexClients($ionicViewService, user, datacontext, common) {
		/*jshint validthis: true */
		var vm = this;

		vm.clients = [];
		vm.loading = false;
		vm.user = user;
		vm.refresh = refresh;

		activate();

		function activate() {
			vm.loading = true;
			return getClients().then(function() {
				vm.loading = false;
			});
		}

		function getClients() {
			return datacontext.client.index().then(function(data){
				vm.clients = data;
				localStorage["clients"] = JSON.stringify(data);
				return vm.clients;
			});
		}

		function refresh() {
			return getClients().then(function() {
				common.$broadcast('scroll.refreshComplete');
			});
		}

		$ionicViewService.clearHistory();
	}
})();

		// if(localStorage["clients"]){
		// 	vm.clients = JSON.parse(localStorage["clients"]);
		// }
		// else{
		// 	vm.loading = true;
		// 	datacontext.client.index().then(function(data){
		// 		vm.clients = data;
		// 		localStorage["clients"] = JSON.stringify(data);
		// 		vm.loading = false;
		// 	});
		// }

		// datacontext.client.index().then(function(data){
		// 	localStorage["clients"] = JSON.stringify(data);
		// });

