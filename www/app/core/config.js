(function() {
	'use strict';

	angular
	.module('eventool.core')
	.config(restangularConfig)
	.config(stateConfig);

	/* @ngInject */
	function restangularConfig(RestangularProvider, HOST) {
		RestangularProvider.setBaseUrl(HOST.LOCALHOST);
	}

	/* @ngInject */
	function stateConfig($urlRouterProvider, $ionicConfigProvider){
		$urlRouterProvider.otherwise("/app/clients");
		$ionicConfigProvider.views.maxCache(0);
	}

})();
