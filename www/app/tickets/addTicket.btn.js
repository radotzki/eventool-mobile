(function() {
	'use strict';

	angular
	.module('eventool.tickets')
	.directive('etAddTicket', etAddTicket);

	/* @ngInject */
	function etAddTicket () {
		function getTemplate () {
			return [
			'<div class="text-center add-btn">',
    		'<a class="button button-icon icon ion-plus-circled"',
    		'ui-sref="app.clients.createTicket({ clientId: vm.clientId })"></a>',
			'</div>'
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