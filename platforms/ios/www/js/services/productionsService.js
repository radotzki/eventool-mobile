angular.module('eventool.services')

.factory('Productions', function($resource, hostUrl) {
	return $resource(hostUrl + '/productions/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		}
	});
})