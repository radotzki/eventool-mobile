(function() {
	'use strict';

	angular
	.module('eventool.friendship')
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

		.state('app.selectNewFriend', {
			url: "/friendship/select/:clientId/",
			views: {
				'menuContent' :{
					controller:  "SelectNewFriendCtrl",
					templateUrl: "app/friendships/createFriendship.html",
					resolve: {
						user: generalAuth
					}              
				}
			}         
		})
		
	}

})();