(function () {
  'use strict';
  angular.module('collectionMod').controller('CollectionController', ['collectionService', '$routeParams', CollectionController]);

  function CollectionController(collectionService, $routeParams) {
    var self = this;
    var creator = $routeParams.creator;


    collectionService.getUserCollection(creator)
      .then(function (collections) {
        self.collectionItems = collections.data;
      });


  };
})();
