(function() {
	'use strict';

	angular
	.module('eventool')

	.config(function ($httpProvider) {
		$httpProvider.interceptors.push(interceptor);
	})

	/* @ngInject */
	function interceptor ($q, $injector) {
		return {
			responseError: function (rejection) {
				if (rejection.status == 403 || rejection.status == 401) {
					$injector.get('auth').logout();
					$injector.get('$state').transitionTo('app.login');
				}
				return $q.reject(rejection);
			}
		}
	};

})();
