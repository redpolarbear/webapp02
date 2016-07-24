'use strict';

angular
    .module('scrapingMod')
    .factory('scrapingService', scrapingService);

scrapingService.$inject = ['$http'];

function scrapingService($http) {
    return {
        getScrapedDetail: getScrapedDetail,
        saveScrapedDetail: saveScrapedDetail
    };

    function getScrapedDetail(link) {
        return $http.post('/api/scrape', link);
    };

    function saveScrapedDetail(item) {
      return $http.post('/api/save', item);
    }

};
