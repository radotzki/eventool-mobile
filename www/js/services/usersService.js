angular.module('eventool.services')

.factory('Users', function($resource, hostUrl) {
	return $resource(hostUrl + '/users/:id', { id: '@id' }, {
		update: {
			method: 'PUT'
		},
		'getTickets': {
			method:'GET',
			url: hostUrl + "/users/:id/tickets",
			// isArray: true
		}
	})
})