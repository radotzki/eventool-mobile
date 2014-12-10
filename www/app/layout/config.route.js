(function() {
	'use strict';

	angular
	.module('eventool.layout')
	.config(stateConfig);

	/* @ngInject */
	function generalAuth($q, auth) {
		var user = auth.getUser();
		if (user) {
			return $q.when(user.user);
		} else {
			return $q.reject({ authenticated: false });
		}
	}

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "app/layout/shell.html",
			controller: 'Shell'
		})
		
	}

})();