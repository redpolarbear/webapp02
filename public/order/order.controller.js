(function () {
  'use strict';
  angular.module('orderMod')
    .controller('OrderController', ['orderService', '$routeParams', OrderController]);

  function OrderController(orderService, $routeParams) {
    var self = this;
    var creator = $routeParams.creator;
    orderService.getUserOrder(creator).then(function (orders) {
      self.orderItems = orders.data;
    });
  }
})();


