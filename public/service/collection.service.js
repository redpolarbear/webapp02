'use strict';
(function () {
	angular.module('collectionMod').factory('collectionService', collectionService);
	collectionService.$inject = ['$http'];

	function collectionService($http) {
		return {
			getUserCollection: getUserCollection
			, saveToCollection: saveToCollection
            ,removeFromCollection:removeFromCollection
		};

		function getUserCollection(creator) {
			return $http.get('/api/collection/' + creator);
		};

		function saveToCollection(newScrapedItem) {
			return $http.post('/api/collection/action/save/', newScrapedItem);
		};

        function removeFromCollection(collectionItemId) {
          return $http.delete('/api/collection/action/remove/' + collectionItemId);
        };
	}
})();
