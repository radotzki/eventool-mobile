(function() {
	'use strict';

	angular
	.module('eventool.comments')
	.controller('IndexComments', IndexComments);

	/* @ngInject */
	function IndexComments($stateParams, datacontext, user, commentsPrepSvc) {
		/*jshint validthis: true */
		var vm = this;
		vm.clientId = $stateParams.clientId;
		vm.user = user;
		vm.comments = commentsPrepSvc;
		vm.newComment;

		vm.saveComment = saveComment;
		vm.deleteComment = deleteComment;
		vm.canDelete = canDelete;

		function saveComment() {
			datacontext.clientComment.create(vm.clientId, {comment: vm.newComment}).then(function(){
				vm.comments.push({ comment: vm.newComment, user: vm.user, created_at: 'now' });
				vm.newComment = '';
			});
		}

		function deleteComment (comment) {
			datacontext.clientComment.remove(comment).then(function(){
				vm.comments.splice(vm.comments.indexOf(comment), 1);
			})
		}

		function canDelete (comment) {
			return comment.user.id === vm.user.id;
		}

	}
})();