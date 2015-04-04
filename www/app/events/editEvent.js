(function() {
    'use strict';

    angular
        .module('eventool.events')
        .controller('EditEvent', EditEvent);

    /* @ngInject */
    function EditEvent($stateParams, $ionicLoading, $state, $window, $ionicHistory, datacontext, actionSheet) {
        /*jshint validthis: true */
        var vm = this;
        vm.event;
        vm.updateEvent = updateEvent;
        vm.confirmDelete = confirmDelete;

        activate();

        function activate() {
            getEvent();
        }

        function getEvent() {
            $ionicLoading.show();
            return datacontext.event.show($stateParams.eventId).then(function(data) {
                vm.event = data;
                $ionicLoading.hide();
                return data;
            });
        }

        function updateEvent() {
            $ionicLoading.show();
            datacontext.event.update(vm.event);
            updatePrices();
        }

        function updatePrices() {
            for (var i = 0; i < vm.event.prices.length; i++) {
                if (!vm.event.prices[i].id) {
                    datacontext.eventPrice.create(vm.event.id, {
                        price: vm.event.prices[i].price
                    });
                }
            }
            $ionicLoading.hide();
            $window.history.back();
        }

        function confirmDelete() {
            var msg = "This will delete '" + vm.event.name + "' event";
            actionSheet.confirmDelete(deleteEvent, msg);
        }

        function deleteEvent() {
            $ionicLoading.show();
            datacontext.event.remove(vm.event).then(function(res) {
                $ionicLoading.hide();
                $ionicHistory.currentView($ionicHistory.backView());
                $state.go('app.events.index');
            });
        }

    }
})();
