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
    //Load all the menus
    menuService.loadAllMenus().then(function (menus) {
      self.menus = [].concat(menus);
    });

    self.isLoggedin = authService.isAuthenticated();
    console.log(self.isLoggedin);
    self.userProfile = authService.getUserCredentials();
//    authService.getUserCredentials().then(function(userProfile) {
//      self.userProfile = userProfile;
//      console.log(userProfile);
//    });
//
    function toggleList() {
      $mdSidenav('left').toggle();
    };

    function logout() {
      authService.logout();
      location.reload();
    };

//    function getUserInfo() {
//      var jwt_token = localStorage.getItem(LOCAL_TOKEN_KEY);
//      if (jwt_token) {
//        var tokenPayload = jwtHelper.decodeToken(jwt_token.split(' ').slice(1)[0]);
//        return tokenPayload;
//      };
//    };

  };
})();
