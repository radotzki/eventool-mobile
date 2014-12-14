(function() {
	'use strict';

	angular
	.module('eventool.core')
	.factory('actionSheet', actionSheet);

	/* @ngInject */
	function actionSheet($ionicActionSheet) {
		var service = {
			confirmDelete: confirmDelete
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

	}
})();