(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('IndexClients', IndexClients);

	/* @ngInject */
	function IndexClients($ionicLoading, $localStorage, user, datacontext, common) {
		/*jshint validthis: true */
		var vm = this;

		vm.clients = [];
		vm.loading = false;
		vm.user = user;
		vm.refresh = refresh;

		activate();
		

		function activate() {
			if ( $localStorage.clients ) {
				vm.clients = $localStorage.clients;
			} else {
				$ionicLoading.show();
				getClients().then(function() {
					$ionicLoading.hide();
				});
			}
		}

		function getClients() {
			return datacontext.client.index().then(function(data){
				vm.clients = data;
				$localStorage.clients = data;
				return data;
			});
		}

		function refresh() {
			return getClients().then(function() {
				common.$broadcast('scroll.refreshComplete');
			});
		}

	}
})();