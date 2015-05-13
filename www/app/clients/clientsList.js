(function() {
    'use strict';

    angular
        .module('eventool.clients')
        .directive('etClientsList', etClientsList);

    /* @ngInject */
    function etClientsList() {
        var directive = {
            controller: ClientsList,
            controllerAs: 'vm',
            templateUrl: 'app/clients/clientsList.html',
            restrict: 'EA',
            bindToController: true,
            scope: {
                'clickCallback': '=',
                'removeClients': '=',
                'clientsSource': '=',
                'refreshService': '='
            }
        };
        return directive;
    }

    /* @ngInject */
    function ClientsList($scope, $ionicLoading, datacontext, common) {
        /*jshint validthis: true */
        var vm = this;

        vm.clients = [];
        vm.loading = false;
        vm.refresh = refresh;

        activate();

        function activate() {
            if (vm.clientsSource) {
                vm.clients = vm.clientsSource;
            } else {
                $ionicLoading.show();
                getClients().then(function() {
                    $ionicLoading.hide();
                });
            }
        }

        function getClients() {
            return datacontext.client.index().then(function(data) {
                vm.clients = data;

                _.remove(vm.clients, function(c) {
                    return _.findIndex(vm.removeClients, function(r) {
                        return c.id === r.id;
                    }) !== -1;
                });
                
                return vm.clients;
            });
        }

        function refresh() {
            return getClients().then(function() {
                common.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.$watch('vm.clientsSource', function () {
            vm.clients = vm.clientsSource;
        });

    }
})();
