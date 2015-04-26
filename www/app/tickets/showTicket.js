(function() {
    'use strict';

    angular
        .module('eventool.tickets')
        .controller('ShowTicket', ShowTicket);

    /* @ngInject */
    function ShowTicket($scope, $state, datacontext, actionSheet, auth) {
        /*jshint validthis: true */
        var vm = this;
        var deleteActionSheet;
        var currentUser;

        vm.clientId = $scope.clientId;
        vm.ticketId = $scope.ticketId;
        vm.closeModal = $scope.closeModal;
        vm.ticket;

        vm.confirmDelete = confirmDelete;
        vm.canDelete = canDelete;

        activate();

        function activate() {
            getTicket();
            currentUser = auth.getUser().user;
        }

        function getTicket() {
            return datacontext.ticket.show(vm.clientId, vm.ticketId).then(function(data) {
                vm.ticket = data;
                return data;
            });
        }

        function confirmDelete() {
            var msg = "This will delete this ticket";
            deleteActionSheet = actionSheet.confirmDelete(deleteTicket, msg);
        }

        function deleteTicket() {
            datacontext.ticket.remove(vm.ticket).then(function(res) {
                vm.closeModal(vm.ticket);
                deleteActionSheet();
            });
        }

        function canDelete() {
            return vm.ticket && new Date(vm.ticket.event.when) >= new Date() &&
                (currentUser.role === 'producer' ||
                    (currentUser.role === 'promoter' && vm.ticket && currentUser.id === vm.ticket.promoter.id));
        }

    }
})();
