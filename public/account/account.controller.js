(function () {
  'use strict';
  angular.module('accountMod')
    .controller('AccountController', ['$scope', AccountController]);

  function AccountController($scope) {
   $scope.showingText = "this is from the controller";//functions
  };
})();
