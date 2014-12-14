(function() {
	'use strict';

	angular
	.module('eventool.clients')
	.controller('CreateClient', CreateClient);

	/* @ngInject */
	function CreateClient($window, datacontext) {
		/*jshint validthis: true */
		var vm = this;
		vm.client = {};
		vm.createClient = createClient;

		function createClient() {
			var newClient = {
				first_name: vm.client.firstName,
				last_name: vm.client.lastName,
				gender: vm.client.gender,
				birthdate: vm.client.birthdate,
				phone_number: vm.client.phone,
				city: vm.client.city
			};

			datacontext.client.create(newClient).then(function(res){
				$window.history.back();
			});
		}

	}
})();