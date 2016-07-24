'use strict';

angular
    .module('scrapingMod')
    .factory('urlValidationService', urlValidationService);

urlValidationService.$inject = ['$http'];

function urlValidationService($http) {
    return {
        urlValidationResult: urlValidationResult
    }

    function urlValidationResult(link) {
      return $http.post('/api/urlvalidation', link);
    };
};
