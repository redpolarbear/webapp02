'use strict';

angular.
  module('shopApp').
  config(['$locationProvider' , '$mdIconProvider', '$routeProvider',
    function config($locationProvider, $mdIconProvider, $routeProvider) {
      $routeProvider
//        .when('/', {
//          templateUrl: 'dashboard/tmpl/discountnews.tmpl.html',
//          controller: 'DiscountNewsController'
//        })
        .when('/', { //->'/scraping'
		  templateUrl: 'scraping/tmpl/scraping.tmpl.html',
		  controller: 'ScrapingController'
        })
	  	.when('/signup', { //->'/scraping'
          templateUrl: 'auth/tmpl/signup.tmpl.html',
          controller: 'AuthenticationController'
        })
//	  	.when('/scraping', {
//		  templateUrl: 'scraping/tmpl/scraping.tmpl.html',
//		  controller: 'ScrapingController'
//	  	})
        .when('/collection/:creator', {
          templateUrl: 'collection/tmpl/collection.tmpl.html',
          controller: 'CollectionController'
        })
        .when('/promo', {
          templateUrl: 'promo/tmpl/promo.tmpl.html',
          controller: 'PromoController'
        })
        .when('/order', {
          templateUrl: 'order/tmpl/order.tmpl.html',
          controller: 'OrderController'
        })
        .when('/account', {
          templateUrl: 'account/tmpl/account.tmpl.html',
          controller: 'AccountController'
        })
        .when('/login', {
          templateUrl: 'auth/tmpl/login.tmpl.html',
          controller: 'AuthenticationController'
        })
        .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);

      $mdIconProvider
        .icon("menu"            , "./assets/svg/menu.svg"            , 24)
        .icon("avatar"          , "./assets/svg/avatar_default.svg"  , 24)
        .icon("shopping_basket" , "./assets/svg/shopping_basket.svg" , 48)
        .icon("my_collections"  , "./assets/svg/my_collections.svg"  , 48)
        .icon("my_promos"       , "./assets/svg/my_promos.svg"       , 48)
        .icon("my_orders"       , "./assets/svg/my_orders.svg"       , 48)
        .icon("my_account"      , "./assets/svg/my_account.svg"      , 48)
        .icon("admin_area"      , "./assets/svg/admin_area.svg"      , 48)
        .icon("up_arrow"        , "./assets/svg/up_arrow.svg"        , 48)
        .icon("down_arrow"      , "./assets/svg/down_arrow.svg"      , 48)
        .icon("remove_collection" , "./assets/svg/remove_collection.svg", 48)
        .icon("cart_collection" , "./assets/svg/cart_collection.svg", 48);


//      $mdThemingProvider.theme('default')
//        .primaryPalette('brown')
//        .accentPalette('red');
    }
  ]);

angular.
module('shopApp').run(function ($rootScope, authService, $location, $http) {
	// register listener to watch route changes
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if ($http.defaults.headers.common.Authorization == undefined) {
          if (next.$$route !== undefined) {
            if (next.$$route.templateUrl !== 'auth/tmpl/login.tmpl.html' && next.$$route.templateUrl !== 'auth/tmpl/signup.tmpl.html') {
              event.preventDefault();
              $location.path('/login');
            };
          } else {
            event.preventDefault();
            $location.path('/');
          };
		} else {
          if (next.$$route !== undefined) {
            if (next.$$route.templateUrl == 'auth/tmpl/login.tmpl.html' || next.$$route.templateUrl == 'auth/tmpl/signup.tmpl.html') {
              event.preventDefault();
              $location.path('/');
            };
          };
        };
	});
});
