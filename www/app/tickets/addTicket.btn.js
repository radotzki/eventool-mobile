(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.directive('etAddTicket', etAddTicket);

	/* @ngInject */
	function etAddTicket () {
		function getTemplate () {
			return [
			'<a class="button button-block button-outline button-positive"',
			'ui-sref="app.clients.createTicket({ clientId: vm.clientId })"',
			'style="margin-left: auto; margin-right: auto; width: 90%;">',
			'Add Ticket',
			'</a>'
			].join('');
		}

		var directive = {
			scope: {},
			controllerAs: 'vm',
			controller: AddTicketBtn,
			bindToController: true,
			restrict: 'E',
			template: getTemplate()
		};
		return directive;

	}

	/* @ngInject */
	function AddTicketBtn ($stateParams) {
		var vm = this;

		vm.clientId = $stateParams.clientId;
	}

})();