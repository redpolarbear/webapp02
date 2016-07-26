/**
 * @author
 * @since 7/8/2016
 */
(function () {
  'use strict';
  angular.module('menuMod').controller('MenuController', [
         'menuService', '$mdSidenav', '$timeout', '$log', MenuController
         ]);
  /* @ngInject */
  function MenuController(menuService, $mdSidenav, $timeout, $log) {
    var self = this;
    self.menus = [];
    self.toggleList = toggleList;
    //Load all the menus
    menuService.loadAllMenus().then(function (menus) {
      self.menus = [].concat(menus);
    });

    function toggleList() {
      $mdSidenav('left').toggle();
    };
  };
})();
