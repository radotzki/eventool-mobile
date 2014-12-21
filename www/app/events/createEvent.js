(function() {
	'use strict';

	angular
	.module('eventool.events')
	.controller('CreateEvent', CreateEvent);

	/* @ngInject */
	function CreateEvent($ionicLoading, $state, datacontext) {
		/*jshint validthis: true */
		var vm = this;
		vm.event = {prices: [], when: new Date()};
		vm.createEvent = createEvent;

		function createEvent() {
			$ionicLoading.show();
			var newEvent = {when: vm.event.when, name: vm.event.name};
			datacontext.event.create(newEvent).then(addPrices).then(showNewEvent);
		}

		function addPrices(resp) {
			for (var i=0; i < vm.event.prices.length; i++) {
				datacontext.eventPrice.create(resp.id, {price: vm.event.prices[i].price});
			}
			return resp.id;
		}

		function showNewEvent(eventId) {
			$ionicLoading.hide();
			$state.go('app.events.detail', {eventId: eventId});
		}

	}
})();
