(function() {
	'use strict';

	angular
	.module('eventool.comments')
	.directive('etComments', etComments);

	/* @ngInject */
	function etComments () {
		var directive = {
			controller: IndexComments,
			controllerAs: 'vm',
			templateUrl: 'app/comments/indexComments.html',
			restrict: 'EA',
			scope: {
				'clientId': '@',
				'user': '='
			}
		};
		return directive;
	}

	/* @ngInject */
	function IndexComments($scope, $ionicLoading, datacontext) {
		/*jshint validthis: true */
		var vm = this;
		
		vm.clientId = $scope.clientId;
		vm.user = $scope.user;
		vm.comments;
		vm.newComment;

		vm.saveComment = saveComment;

		activate();

		function activate() {
			getComments();
		}

		function getComments() {
			$ionicLoading.show();
			return datacontext.clientComment.index(vm.clientId).then(function(responseData) {
				vm.comments = responseData;
				$ionicLoading.hide();
				return responseData;
			});
		}

		function saveComment() {
			datacontext.clientComment.create(vm.clientId, {comment: vm.newComment}).then(function(){
				vm.comments.push({ comment: vm.newComment, user: vm.user });
			});
		}

	}
})();