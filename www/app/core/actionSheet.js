(function() {
	'use strict';

	angular
	.module('eventool.core')
	.factory('actionSheet', actionSheet);

	/* @ngInject */
	function actionSheet($ionicActionSheet) {
		var service = {
			confirmDelete: confirmDelete,
			confirm: confirm
		};
		return service;

		function confirmDelete(callback, title) {
			var hideSheet = $ionicActionSheet.show({
				titleText: title || 'Are you sure?',
				destructiveText: 'Delete',
				cancelText: 'Cancel',
				destructiveButtonClicked: callback
			});
			return hideSheet;
		}

		function confirm (callback, title) {
			var hideSheet = $ionicActionSheet.show({
				titleText: title || 'Are you sure?',
				buttons: [ { text: 'Yes' } ],
				cancelText: 'Cancel',
				buttonClicked: callback
			});
			return hideSheet;
		}

	}
})();