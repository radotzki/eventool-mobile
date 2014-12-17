(function() {
	'use strict';

	angular
	.module('eventool.registration')
	.controller('RegisterProduction', RegisterProduction);

	/* @ngInject */
	function RegisterProduction($state, $localStorage, datacontext) {
		/*jshint validthis: true */
		var vm = this;

		vm.user;
		vm.productionName;

		vm.register = register;

		function register () {
			$localStorage.$reset();
			datacontext.production.create(productionAdapter()).then(function(res){
				$state.go('login', {msg: 'You can login to your new production!'});
			});
		}

		function productionAdapter() {
			return {
				name: vm.productionName, first_name: vm.user.firstName, last_name: vm.user.lastName,
				email: vm.user.email, password: vm.user.password, phone_number: vm.user.phone
			};
		}

	}
})();