'use strict';

angular
    .module('orderMod')
    .factory('orderService', orderService);

orderService.$inject = ['$http'];

function orderService($http) {
    return {
//        getUserCollection: getUserCollection,
        saveOrder: saveOrder
    };

//    function getUserCollection(creator) {
//      return $http.get('/api/collection/creator/' + creator);
//    };
//
    function saveOrder(newOrderedItem) {
      return $http.post('/api/order/action/save/', newOrderedItem);
    };
}
