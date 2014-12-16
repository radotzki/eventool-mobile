(function() {
	'use strict';

	angular
	.module('eventool.friendship')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.addFriend', {
			url: "/friendship/select/:clientId/",
			views: {
				'tab-clients' :{
					controller:  "AddFriend as vm",
					templateUrl: "app/friendships/addFriend.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter']);
						}]
					}              
				}
			}         
		});
		
	}

})();