(function() {
	'use strict';

	angular
	.module('eventool.core')
	.constant('HOST', {
		DEV : 'http://amitay.cloudapp.net:3000/api/v1',
		LOCALHOST: 'http://localhost:3000/api/v1',
		TEST: 'http://eventool-test.herokuapp.com/api/v1',
  	PROD: 'http://amitay.cloudapp.net/api/v1'
	});

})();
