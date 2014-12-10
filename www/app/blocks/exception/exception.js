(function() {
    'use strict';

    angular
    .module('blocks.exception')
    .factory('exception', exception);

    /* @ngInject */
    function exception(logger, $state) {
        var errorMsg;

        var service = {
            getErrorMsg: getErrorMsg,
            xhrCatcher: xhrCatcher
        };
        return service;

        function getErrorMsg() {
            return errorMsg;
        }

        function xhrCatcher(message, error) {
            logger.error(message, error);

            if ( error.status === 0 ) {
                errorMsg = 'No internet connection.';
                $state.go('app.login', null, {reload: true});
            } else if ( error.status === 401 ) {
                errorMsg = 'You need to login first.';
                $state.go('app.login', null, {reload: true});
            } else if ( error.status === 403 ) {
                errorMsg = 'You are not allowed to see this.';
                $state.go('app.login', null, {reload: true});
            } else if ( error.status === 499 ) {
                errorMsg = error.data;
                $state.go('app.login', null, {reload: true});
            }
        }

    }
})();