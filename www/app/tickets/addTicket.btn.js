(function() {
    'use strict';

    angular
        .module('eventool.tickets')
        .directive('etAddTicket', etAddTicket);

    /* @ngInject */
    function etAddTicket() {
        function getTemplate() {
            return [
                '<div class="text-center add-btn">',
                '<a class="button button-icon icon ion-plus-circled"',
                'ng-click="vm.openModal()"></a>',
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
    function AddTicketBtn($state, $stateParams, $ionicModal, $rootScope) {
        var vm = this;
        var ticketModal;

        vm.clientId = $stateParams.clientId;
        vm.openModal = openModal;

        function openModal() {
            var modalScope = $rootScope.$new();
            modalScope.clientId = vm.clientId;
            modalScope.closeModal = closeModal;

            $ionicModal.fromTemplateUrl('app/tickets/createTicket.html', {
                animation: 'slide-in-up',
                scope: modalScope
            }).then(function(modal) {
                ticketModal = modal;
                modal.show();
            });
        }

        function closeModal(ticket) {
            ticketModal.remove();
            $state.go($state.current, {}, {reload: true});
        }
    }

})();
