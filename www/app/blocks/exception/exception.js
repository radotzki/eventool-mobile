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
                $state.go('login', null, {reload: true});
            } else if ( error.status === 401 ) {
                errorMsg = 'You need to login first.';
                $state.go('login', null, {reload: true});
            } else if ( error.status === 403 ) {
                // errorMsg = 'You are not allowed to see this.';
                $state.go('login', null, {reload: true});
            } else if ( error.status === 499 ) {
                errorMsg = error.data.message;
                $state.go('login', null, {reload: true});
            } else if ( error.status === 500 ) {
                errorMsg = 'Opps. something went wrong.';
                $state.go('login', null, {reload: true});
            }
        }

    }
})();