'use strict';

angular
    .module('shopApp')
    .factory('weidianTokenService', weidianTokenService);

weidianTokenService.$inject = ['$http'];

function weidianTokenService($http) {
  return {
      weidianGetToken: weidianGetToken
  }
  function weidianGetToken() {
        return $http.get('/api/gettoken');
    }
};
