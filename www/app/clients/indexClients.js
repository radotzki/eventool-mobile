(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('IndexClients', IndexClients);

	/* @ngInject */
	function IndexClients($state) {
		/*jshint validthis: true */
		var vm = this;

		vm.clientClicked = clientClicked;

		function clientClicked (clientId) {
			$state.go('app.showClient', {clientId: clientId});
		}

	}
})();