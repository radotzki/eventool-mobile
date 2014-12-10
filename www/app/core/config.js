(function() {
	'use strict';

	angular
	.module('eventool.core')

	.config(restangularConfig)

	.config(interceptorConfig)

	.config(stateConfig)

	/* @ngInject */
	function restangularConfig(RestangularProvider, HOST) {
		RestangularProvider.setBaseUrl(HOST.DEV);
	}

	/* @ngInject */
	function stateConfig($urlRouterProvider){
		$urlRouterProvider.otherwise("/app/clients");
	}

	/* @ngInject */
	function interceptorConfig($httpProvider) {
		$httpProvider.interceptors.push(interceptor);
	}

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
