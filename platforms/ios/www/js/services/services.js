angular.module('eventool.services')

.factory('Entry', function($resource, hostUrl) {
	return $resource(hostUrl + '/clients/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		}
	});
})



