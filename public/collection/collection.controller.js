(function () {
  'use strict';
  angular.module('collectionMod').controller('CollectionController', ['collectionService', '$routeParams', CollectionController]);

  function CollectionController(collectionService, $routeParams) {
    var self = this;
    var creator = $routeParams.creator;
    self.removeCollectionItem = removeCollectionItem;

    collectionService.getUserCollection(creator)
      .then(function (collections) {
        self.collectionItems = collections.data;
      });

    function removeCollectionItem(collectionItemId, index){
      collectionService.removeFromCollection(collectionItemId).then(function(result) {
        self.collectionItems.splice(index, 1)
      });
    };
  };
})();
