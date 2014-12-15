(function() {
	'use strict';

	angular
	.module('eventool.events')
	.controller('IndexEvents', IndexEvents);

	/* @ngInject */
	function IndexEvents($ionicLoading, datacontext, user) {
		/*jshint validthis: true */
		var vm = this;
		vm.user = user;
		vm.events;

		activate();

		function activate() {
			getEvents();
		}

		function getEvents() {
			$ionicLoading.show();
			return datacontext.event.index().then(function(data){
				vm.events = data;
				$ionicLoading.hide();
				return data;	
			});
		}

	}
})();