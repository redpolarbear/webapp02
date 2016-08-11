'use strict';
(function () {
 angular.module('authenticationMod').constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  }).service('authService', function ($q, jwtHelper, $http) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      };
    };

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    };

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    };

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    };

    var signup = function (user) {
      return $q(function (resolve, reject) {
        $http.post('/auth/signup', user).then(function (result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          }
          else {
            reject(result.data.msg);
          }
        });
      });
    };

    var login = function (user) {
      return $q(function (resolve, reject) {
        $http.post('/auth/login', user).then(function (result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          }
          else {
            reject(result.data.msg);
          }
        });
      });
    };

    var logout = function () {
      destroyUserCredentials();
    };

    loadUserCredentials();

   if (authToken !== undefined){
     if(jwtHelper.isTokenExpired(authToken)) {
      destroyUserCredentials();
     };
   };

    return {
      getUserCredentials: function() {
        if (authToken) {
          return jwtHelper.decodeToken(authToken.split(' ').slice(1)[0]);
        }
      }
      , login: login
      , signup: signup
      , logout: logout
      , isAuthenticated: function () {
        return isAuthenticated;
      }
    };
  }).factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated
        , }[response.status], response);
        location.reload();
        return $q.reject(response);
      }
    };
  }).factory('authInputValidation', function ($q, $http) {
    return {
      checkUsername: checkUsername
      , checkEmail: checkEmail
    };
    function checkUsername(username) {
      return $q(function (resolve, reject) {
        $http.post('/auth/checkusername', username).then(function (result) {
          if (result.data.isAvailable) {
            resolve(result.data.msg);
          }
          else {
            reject(result.data.msg);
          }
        });
      });
    };

    function checkEmail(email) {
      return $q(function (resolve, reject) {
        $http.post('/auth/checkemail', email).then(function (result) {
          if (result.data.isAvailable) {
            resolve(result.data.msg);
          }
          else {
            reject(result.data.msg);
          }
        });
      });
    };
 }).config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
})();
