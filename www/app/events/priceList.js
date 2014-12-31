(function() {
  'use strict';

  angular
  .module('eventool.events')
  .directive('etPriceList', etPriceList);

  /* @ngInject */
  function etPriceList () {
    var directive = {
      controller: PriceList,
      controllerAs: 'vm',
      templateUrl: 'app/events/priceList.html',
      scope: {
        'prices': '=',
        'editEvent': '@'
      },
      restrict: 'EA'
    };
    return directive;
  }

  /* @ngInject */
  function PriceList($scope) {
    /*jshint validthis: true */
    var vm = this;
    vm.prices;
    vm.editEvent = $scope.editEvent;

    vm.addPrice = addPrice;
    vm.removePrice = removePrice;

    $scope.$watch('prices', function(newVal) {
      if($scope.prices) { activate(); }
    }, true);

    function activate() {
      vm.prices = $scope.prices;
    }

    function addPrice() {
      vm.prices.push({price: vm.newPrice});
      vm.newPrice = null;
    }

    function removePrice(index) {
      vm.prices.splice(index, 1);
    }

  }
})();
