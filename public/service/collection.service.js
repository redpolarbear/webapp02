'use strict';
(function () {
	angular.module('collectionMod').factory('collectionService', collectionService);
	collectionService.$inject = ['$http'];

	function collectionService($http) {
		return {
			getUserCollection: getUserCollection
			, saveToCollection: saveToCollection
		};

		function getUserCollection(creator) {
			return $http.get('/api/collection/' + creator);
		};

		function saveToCollection(newScrapedItem) {
			return $http.post('/api/collection/action/save', newScrapedItem);
		};
	}
})();
