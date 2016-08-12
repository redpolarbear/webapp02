'use strict';
(function () {
  angular.module('orderMod').factory('orderService', orderService);
  orderService.$inject = ['$http'];

  function orderService($http) {
    return {
      getUserOrder: getUserOrder,
      saveOrder: saveOrder
    };

    function getUserOrder(creator) {
      return $http.get('/api/order/' + creator);
    };

    function saveOrder(newOrderedItem) {
      return $http.post('/api/order/action/save/', newOrderedItem);
    };
  };
})();
