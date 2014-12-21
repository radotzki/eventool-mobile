(function() {
	'use strict';

	angular
	.module('eventool.friendship')
	.controller('AddFriend', AddFriend);

	/* @ngInject */
	function AddFriend($state, $stateParams, datacontext) {
		/*jshint validthis: true */
		var vm = this;

		vm.clientClicked = clientClicked;

		function clientClicked (clientId) {
			datacontext.friendship.create($stateParams.clientId, clientId).then(function(){
				$state.go('app.clients.detail.friends', {clientId: $stateParams.clientId});
			})
		}

	}
})();