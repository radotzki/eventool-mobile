(function() {
  'use strict';

  angular
  .module('eventool.services')
  .factory('auth', auth);

  /* @ngInject */
  function auth($q, Restangular) {
    var userInfo;
    var deferred;
    var service = {
      login: login,
      logout: logout,
      getUser: getUser
    };
    
    init();

    function login(user) {
      deferred = $q.defer();
      Restangular.all('login').post(user).then(successLogin, errorLogin);
      return deferred.promise;
    }

    function successLogin (data) {
      userInfo = {
        token: data.token,
        user: data.user
      };

      Restangular.setDefaultHeaders({token: userInfo.token});
      localStorage.setItem('user', JSON.stringify(userInfo));
      deferred.resolve(userInfo);
    }

    function errorLogin (error) {
      deferred.reject(error);
    }

    function logout() {
      userInfo = null;
      localStorage.removeItem('user');
      delete Restangular.defaultHeaders.token;
    }

    function getUser() {
      return userInfo;
    }

    function init() {
      if (localStorage["user"]) {
        userInfo = JSON.parse(localStorage["user"]);
        Restangular.setDefaultHeaders({token: userInfo.token});
      }
    }

    return service;
  }
})();

