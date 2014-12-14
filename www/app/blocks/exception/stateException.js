(function() {
	'use strict';

	angular
	.module('blocks.exception')
	.run(stateChangeError);

	/* @ngInject */
	function stateChangeError($rootScope, exception){
		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
			if ( !error.authenticated ) {
				exception.xhrCatcher('You are not allowed to see this.', {status: 403});
			}
		});
	}

})();
