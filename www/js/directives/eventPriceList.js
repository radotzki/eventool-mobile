angular.module('eventool.directives')

.directive('eventPriceList', function () {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/eventPriceList.html',
    scope: {
      'prices': '='
    },
    controller : function($scope, $filter) {

      $scope.addPrice = function() {
        if (angular.isNumber($scope.newPrice)) {
          // Check if price exist
          var addToArray = true;
          for(var i = 0; i < $scope.prices.length; i++){
            if($scope.prices[i] === $scope.newPrice){
              addToArray = false;
            }
          }

          if(addToArray){
            $scope.prices.push($scope.newPrice);
            $scope.newPrice = null;
          }
        }
      };

      $scope.deletePrice = function  (index) {
        $scope.prices.splice(index, 1);
      };
    }
  };
})