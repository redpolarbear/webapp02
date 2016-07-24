'use strict';

angular
    .module('orderMod')
    .factory('orderService', orderService);

orderService.$inject = ['$http'];

function orderService($http) {
    return {
//        getUserCollection: getUserCollection,
        saveToOrder: saveToOrder
    };

//    function getUserCollection(creator) {
//      return $http.get('/api/collection/creator/' + creator);
//    };
//
    function saveToOrder(newScrapedItem) {
      return $http.post('/api/savetoorder', newScrapedItem);
    };
}
