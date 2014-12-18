(function() {
	'use strict';

	angular
	.module('eventool.friendship')
	.controller('IndexFriends', IndexFriends);

	/* @ngInject */
	function IndexFriends($stateParams, friendsPrepSvc) {
		/*jshint validthis: true */
		var vm = this;
		vm.clientId = $stateParams.clientId;
		vm.friends = friendsPrepSvc;

	}
})();