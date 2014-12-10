(function() {
	'use strict';

	angular
	.module('eventool.core')

	.run(ionicReady)

	.run(stateChangeError)
	
	/* @ngInject */
	function ionicReady($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}

	/* @ngInject */
	function stateChangeError($rootScope, $state){
		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
			if ( !error.authenticated ) {
				$state.go("app.login");
			}
		});
	}

})();
