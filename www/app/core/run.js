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
	function stateChangeError($rootScope, exception){
		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
			if ( !error.authenticated ) {
				exception.xhrCatcher('You are not allowed to see this.', {status: 403});
			} else {
				console.log("else!");
			}
		});
	}

})();
