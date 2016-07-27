/**
 * @author
 * @since 7/8/2016
 */
(function () {
  'use strict';
  angular.module('menuMod').controller('MenuController', [
         'menuService', '$mdSidenav', '$timeout', 'authService', '$location', '$log', MenuController
         ]);
  /* @ngInject */
  function MenuController(menuService, $mdSidenav, $timeout, authService, $location, $log) {
    var self = this;
    self.menus = [];
    self.toggleList = toggleList;
    self.logout = logout;
    //Load all the menus
    menuService.loadAllMenus().then(function (menus) {
      self.menus = [].concat(menus);
    });

    function toggleList() {
      $mdSidenav('left').toggle();
    };

    function logout() {
      authService.logout();
      $location.path('/login');

    };
  };
})();
