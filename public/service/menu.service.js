(function () {
  'use strict';
  angular.module('menuMod').service('MenuService', ['$q', MenuService]);
  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function MenuService($q) {
    var menus = [
      {
        name: 'I WANNA BUY~BUY~BUY~'
        , icon: 'shopping_basket'
        , description: 'ADVANTURE ALL OVER THE WORLD'
        , href: '/scraping'
      }
      , {
        name: 'My Collections'
        , icon: 'my_collections'
        , description: 'SECRET BASE FOR ADVANTURE'
        , href: '/collection/matthewxu'
      }
      , {
        name: 'My Promos'
        , icon: 'my_promos'
        , description: 'SECRET FATAL WEAPON'
        , href: '/promo'
      }
      , {
        name: 'My Orders'
        , icon: 'my_orders'
        , description: 'TROPHIES OF ADVANTURE'
        , href: '/order'
      }
      , {
        name: 'My Account'
        , icon: 'my_account'
        , description: 'INSCRIBE NAME UPON ADVANTURE'
        , href: '/account'
      }
      , {
        name: 'Admin Area'
        , icon: 'admin_area'
        , description: 'MASTER OF ADVANTURE'
        , href: '/admin'
      }
    ];
    // Promise-based API
    return {
      loadAllMenus: function() {
        // Simulate async nature of real remote calls
        return $q.when(menus);
      }
    };
  };
})();
