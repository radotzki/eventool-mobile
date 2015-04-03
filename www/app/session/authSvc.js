(function() {
    'use strict';

    angular
        .module('eventool.session')
        .factory('auth', auth);

    /* @ngInject */
    function auth($q, $state, Restangular, $localStorage, exception) {
        var userInfo;
        var deferred;

        var service = {
            login: login,
            logout: logout,
            getUser: getUser,
            stateAuth: stateAuth
        };

        init();
        return service;

        function stateAuth(howCan) {
            if (userInfo && howCan.indexOf(userInfo.user.role) != -1) {
                return $q.when(userInfo.user);
            } else {
                return $q.reject({
                    authenticated: false
                });
            }
        }

        function login(user) {
            deferred = $q.defer();
            Restangular.all('login').post(user).then(successLogin, errorLogin);
            return deferred.promise;
        }

        function successLogin(data) {
            userInfo = {
                token: data.token,
                user: data.user
            };

            Restangular.setDefaultHeaders({
                token: userInfo.token
            });
            $localStorage.user = userInfo;
            deferred.resolve(userInfo);
        }

        function errorLogin(error) {
            exception.xhrCatcher("Error login", error);
            deferred.reject(error);
        }

        function logout() {
            userInfo = null;
            delete $localStorage.user;
            delete Restangular.defaultHeaders.token;
            $state.go('login');
        }

        function getUser() {
            return userInfo;
        }

        function init() {
            if ($localStorage.user) {
                userInfo = $localStorage.user;
                Restangular.setDefaultHeaders({
                    token: userInfo.token
                });
            }
        }

    }
})();
