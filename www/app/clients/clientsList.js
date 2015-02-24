(function () {
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
                'clickCallback': '='
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
            $ionicLoading.show();
            getClients().then(function () {
                $ionicLoading.hide();
            });
        }

        function getClients() {
            return datacontext.client.index().then(function (data) {
                vm.clients = data;
                return data;
            });
        }

        function refresh() {
            return getClients().then(function () {
                common.$broadcast('scroll.refreshComplete');
            });
        }

    }
})();
