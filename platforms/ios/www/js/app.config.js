(function() {
	'use strict';

	angular
	.module('eventool')

	.config(function ($httpProvider) {
		$httpProvider.interceptors.push(interceptor);
	})

	function interceptor ($q, $location) {
		return {
			// request: function (config) {
			// 	console.log(config);
			// 	return config;
			// },

			// response: function (result) {
			// 	console.log('Repos:');
			// 	result.data.splice(0, 10).forEach(function (repo) {
			// 		console.log(repo.name);
			// 	})
			// 	return result;
			// },

			responseError: function (rejection) {
				console.log('Failed with', rejection.status, 'status');
				if (rejection.status == 403) {
					$location.url('/login');
				}

				return $q.reject(rejection);
			}
		}
	};

})();
