(function() {
	'use strict';

	angular
	.module('eventool.core')
	.run(ionicReady);
	
	/* @ngInject */
	function ionicReady($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}

})();
