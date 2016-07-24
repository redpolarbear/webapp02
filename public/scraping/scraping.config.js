'use strict';

angular.
  module('scrapingMod').
  config(['$mdIconProvider',
    function config($mdIconProvider) {

      $mdIconProvider
        .icon("lululemon"       , "../assets/brand/lululemon_logo.jpg"        , 48)
        .icon("herschelsupply"  , "../assets/brand/herschelsupply_logo.png"  , 48)
        .icon("mec"             , "../assets/brand/mec_logo.svg"             , 48);

    }
  ]);
