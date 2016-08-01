/**
 * @author
 * @since 7/8/2016
 */
(function () {
  'use strict';
  angular.module('menuMod').controller('MenuController', [
         'menuService', '$mdSidenav', '$timeout', 'authService', '$location', 'jwtHelper', '$log', MenuController
         ]);
  /* @ngInject */
  function MenuController(menuService, $mdSidenav, $timeout, authService, $location, jwtHelper, $log) {
    var self = this;
    //    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    self.menus = [];
    self.toggleList = toggleList;
    self.logout = logout;
//    //Load all the menus
//    menuService.loadAllMenus().then(function (menus) {
//      self.menus = [].concat(menus);
//    });
    self.isLoggedin = authService.isAuthenticated();
    self.userProfile = authService.getUserCredentials()._doc;

    if (self.isLoggedin) {
      console.log(self.userProfile);
      var userName = self.userProfile.username;
      var userRole = self.userProfile.role;
      var menuItems = [
        {
          name: 'I WANNA BUY~BUY~BUY~'
          , icon: 'shopping_basket'
          , description: 'ADVANTURE ALL OVER THE WORLD'
          , role: 100
          , href: '/'
      }
      , {
          name: 'My Collections'
          , icon: 'my_collections'
          , description: 'SECRET BASE FOR ADVANTURE'
          , role: 100
          , href: '/collection/' + userName
      }
      , {
          name: 'My Promos'
          , icon: 'my_promos'
          , description: 'SECRET FATAL WEAPON'
          , role: 100
          , href: '/promo/' + userName
      }
      , {
          name: 'My Orders'
          , icon: 'my_orders'
          , description: 'TROPHIES OF ADVANTURE'
          , role: 100
          , href: '/order/' + userName
      }
      , {
          name: 'My Account'
          , icon: 'my_account'
          , description: 'INSCRIBE NAME UPON ADVANTURE'
          , role: 100
          , href: '/account/' + userName
      }
      , {
          name: 'Admin Area'
          , icon: 'admin_area'
          , description: 'MASTER OF ADVANTURE'
          , role: 999
          , href: '/admin/'
      }
    ];
      self.menus = menuItems.filter(findObjectbyUserRole(userRole));
    };

    function findObjectbyUserRole(userRole) {
      return function (element) {
        return element.role <= userRole;
      }
    };

    function toggleList() {
      $mdSidenav('left').toggle();
    };

    function logout() {
      authService.logout();
      location.reload();
    };
  };
})();
