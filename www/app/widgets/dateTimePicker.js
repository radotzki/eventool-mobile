(function() {
  'use strict';

  angular
  .module('eventool.widgets')
  .directive('etDatePicker', etDatePicker);

  /* @ngInject */
  function etDatePicker () {
    var template = [
    '<input type="text" readonly="readonly" ng-model="formatted"',
    'ng-click="popup()" placeholder="{{placeholder}}">'
    ].join('');

    var directive = {
      controller: DatePicker,
      template: template,
      scope: {
        'title': '@',
        'dateModel': '=ngModel',
        'placeholder': '@',
        'startView': '@',
        'minView': '@',
        'dateFormat': '@',
        'minuteStep': '@'
      },
      restrict: 'E'
    };
    return directive;
  }

  /* @ngInject */
  function DatePicker($scope, $ionicPopup, $filter) {
    /*jshint validthis: true */

    $scope.dateModel = Date.now();
    var minuteStep = $scope.minuteStep ? Number($scope.minuteStep) : 15;
    $scope.config = { startView: $scope.startView, minView: $scope.minView, minuteStep: minuteStep };
    $scope.formatted;

    $scope.popup = popup;
    $scope.onTimeSet = onTimeSet;

    var myPopup;
    var template = [
    '<datetimepicker ng-model="dateModel"',
    'on-set-time="onTimeSet(newDate, oldDate)"',
    'datetimepicker-config="config">',
    '</datetimepicker>'].join('');
    var buttons = [
    {text: 'Cancel'},
    {
      text: '<b>Choose</b>',
      type: 'button-positive',
      onTap: onTimeSet
    } 
    ];

    function onTimeSet (newDate, oldDate) {
      $scope.formatted = $filter('date')(newDate, $scope.dateFormat || 'mediumDate');
      $scope.dateModel = newDate
      if ( $scope.minView == 'day') {
        $scope.dateModel.setHours(10);
      } 
      
      myPopup.close();
    }

    function popup () {
      myPopup = $ionicPopup.show({
        template: template,
        title: $scope.title || 'Select Date',
        scope: $scope,
        buttons: buttons
      }); 
    }

  }
})();