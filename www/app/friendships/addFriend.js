(function() {
	'use strict';

	angular
	.module('eventool.friendship')
	.controller('AddFriend', AddFriend);

	/* @ngInject */
	function AddFriend($window, $stateParams, datacontext) {
		/*jshint validthis: true */
		var vm = this;

		vm.clientClicked = clientClicked;

		function clientClicked (clientId) {
			datacontext.friendship.create($stateParams.clientId, clientId).then(function(){
				$window.history.back();
			})
		}

	}
})();