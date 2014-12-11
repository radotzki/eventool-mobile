(function() {
	'use strict';

	angular
	.module('eventool.friendship')
	.config(stateConfig);

	/* @ngInject */
	function stateConfig($stateProvider){
		$stateProvider

		.state('app.selectNewFriend', {
			url: "/friendship/select/:clientId/",
			views: {
				'tab-clients' :{
					controller:  "SelectNewFriendCtrl",
					templateUrl: "app/friendships/createFriendship.html",
					resolve: {
						user: ['auth', function(auth) {
							return auth.stateAuth(['producer', 'promoter']);
						}]
					}              
				}
			}         
		})
		
	}

})();