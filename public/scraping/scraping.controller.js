(function () {
  'use strict';
  angular.module('scrapingMod').controller('ScrapingController', ['$mdDialog', 'scrapingService', 'urlValidationService', '$sce', 'weidianTokenService', 'collectionService', 'orderService', 'weidianService', 'authService', ScrapingController]);

  function ScrapingController($mdDialog, scrapingService, urlValidationService, $sce, weidianTokenService, collectionService, orderService, weidianService, authService, $log) {
    var self = this;
    var scrapeConfirm = $mdDialog.confirm()
                          .title('ARE YOU SURE?')
                          .textContent('THE DOOR IS ABOUT TO OPEN ...')
                          .ok('YES')
                          .cancel('NO');
    var weidianRedirectConfirm = $mdDialog.confirm()
                                   .title('ARE YOU SURE?')
                                   .textContent('The item has been saved to the Order. Open the Weidian Link Now???')
                                   .ok('YES')
                                   .cancel('NO');
    var resetConfirm = $mdDialog.confirm().title('ARE YOU SURE?').textContent('Close the door?').ok('YES').cancel('NO');
    var successAlert = $mdDialog.alert().title('THE DOOR IS OPEN!').textContent('Welcome to the NEW WORLD!').ariaLabel('Success Alert').ok('OK');
    var failureAlert = $mdDialog.alert().title('Something wrong with the key!').textContent('Please check the key you input!').ariaLabel('Failure Alert').ok('OK');
    var notAvailableAlert = $mdDialog.alert().title('The key is too advanced!').textContent('We are trying hard to make the correct door for you!').ariaLabel('Not Available Alert').ok('OK');
    var saveConfirm = $mdDialog.confirm().title('ARE YOU SURE?').textContent('Add To My Collections ...').ok('YES').cancel('NO');
    var checkOutConfirm = $mdDialog.confirm().title('ARE YOU SURE?').textContent('Do you want to check out now?').ok('YES').cancel('NO');
    var successSaveAlert = $mdDialog.alert().title('Contratulations').textContent('Has been saved into your collections!').ariaLabel('Success Save Alert').ok('OK');
    var failureSaveAlert = $mdDialog.alert().title('Warning').textContent('Failed to add into your collections').ariaLabel('Failure Save Alert').ok('OK');
    var checkOutReminderAlert = $mdDialog.alert()
                                  .title('Reminder')
                                  .textContent('You may find the Weidian Link in - "My Order"')
                                  .ariaLabel('Checkout Reminder Alert')
                                  .ok('OK');
    var userProfile = {};
    self.hidingArrowShowing = false; //hiding the arrow switch
    self.formShowing = true; //showing the form request
    self.getScrapedItem = getScrapedItem;
    self.addToMyCollections = addToMyCollections;
    self.colorOnChange = colorOnChange; //Color onChange the sizes and the images
    self.setImage = setImage;
    self.resetLinkInputForm = resetLinkInputForm;
    self.checkOut = checkOut;
    if (authService.isAuthenticated) {
      userProfile = authService.getUserCredentials()._doc;
    };
    var newOrderedItem = {};
    newOrderedItem.creator = userProfile.username;


    function getScrapedItem() {
      $mdDialog.show(scrapeConfirm).then(function () {
        var link = {
          url: self.url
        };
        self.colors = []; //reset the colors array
        self.sizes = []; //reset the sizes array
        //show the loading progress circular
        showWIPDialog();
        //validate the input url (func)
        urlValidationService.urlValidationResult(link).then(function (response) {
          //get the scrape detail by callback function
          scrapingService.getScrapedDetail(link).then(function (result) {
            //return 'result' = if correct -> object.data is object if not correct -> object.data is 'error'
            if (result.data == 'error') { //error
              $mdDialog.hide();
              $mdDialog.show(failureAlert);
            }
            else if (result.data == 'not available') { //not available
              $mdDialog.hide();
              $mdDialog.show(notAvailableAlert);
            }
            else { //success
              $mdDialog.hide();
              $mdDialog.show(successAlert);
              self.item = result.data;
              console.log(self.item); //sample
              //present the Source, Icon and the From
              self.source = sourceName(self.item.url).sourceName;
              self.brandIconUrl = sourceName(self.item.url).brandIcon;
              self.item.source = self.source;
              self.item.brandIconUrl = self.brandIconUrl;
              //load the colors
              for (var i = 0; i < self.item.skus.length; i++) {
                self.colors.push(self.item.skus[i].color);
              };
              //add the creator to the self.item
              self.item.creator = userProfile.username;
              self.agent_percentage = userProfile.agent_percentage;
              //after the color activated, load sizes - colorOnChange(color)
              colorOnChange(self.colors[0]); //just need to load once in case that the color name of the two scraping items are the same.
              //set the mainImageUrl
              //set the quantities
              self.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
              //set the description detail
              self.finalDescriptionDetails = $sce.trustAsHtml(writeDescriptionDetail(self.item));
              self.formShowing = false; //hide the form
              self.hidingArrowShowing = true; //show the arrow switch
              self.disableLinkInput = true; //disable the input
              self.detailShowing = true; //show the detail framework
            };
          });
        }, function (response) { //404 error
          $mdDialog.show(failureAlert);
        });
      }, function () { //choose the "no" in the confirmation
        //console.log('no');
      });
    };

    function addToMyCollections() {
      $mdDialog.show(saveConfirm).then(function () {
        scrapingService.saveScrapedDetail(self.item).then(function (savedScrapedItem) {
          collectionService.saveToCollection(savedScrapedItem.data).then(function (savedCollectionItem) {
            if (savedCollectionItem.data.success) {
              $mdDialog.show(successSaveAlert);
              self.disableFavorites = true;
            }
            else {
              $mdDialog.show(failureSaveAlert);
            };
          }, function () { //error when saving to the collection...
            $mdDialog.show(failureSaveAlert);
          });
        }, function () { //error when saving to the scraped...
          $mdDialog.show(failureSaveAlert);
        });
      }, function () { //choose the "no" in the confirmation
        //
      });
    };

    function sourceName(url) {
      var source_name;
      var brand_icon;
      if (url.indexOf('herschelsupply.ca') > -1) {
        source_name = 'HERSCHEL SUPPLY CO.';
        brand_icon = '../../assets/brand/herschelsupply_logo.png';
      }
      else if (url.indexOf('mec.ca') > -1) {
        source_name = 'Mountain Equipment Co-operative';
        brand_icon = '../../assets/brand/mec_logo.svg';
      }
      else if (url.indexOf('lululemon.com') > -1) {
        source_name = 'lululemon athletica';
        brand_icon = '../../assets/brand/lululemon_logo.jpg';
      };
      var source = {
        sourceName: source_name
        , brandIcon: brand_icon
      };
      return source;
    };
    //change the color, will change the sizes and the images
    function colorOnChange(color) {
      self.original_price = self.item.skus.filter(findObjectbyColor(color))[0].original_price;
      self.sales_price = self.item.skus.filter(findObjectbyColor(color))[0].sales_price ? self.item.skus.filter(findObjectbyColor(color))[0].sales_price : 'N/A';
      self.sizes = self.item.skus.filter(findObjectbyColor(color))[0].sizes;
      self.imageUrls = self.item.imageUrls.filter(findObjectbyColor(color))[0].imageUrls;
      self.mainImageUrl = self.imageUrls[0];
      //calculate the CNY Price
      if (self.sales_price !== 'N/A') {
        self.basePrice = self.sales_price;
        self.isSales = true;
      }
      else {
        self.basePrice = self.original_price;
        self.isSales = false;
      };
      self.cnyPrice = Math.round(parseFloat(self.basePrice.slice(1, self.basePrice.length - 4)) * 1.12 * 5.2 * (1 + (userProfile.agent_percentage / 100)));
    };

    function findObjectbyColor(color) {
      return function (element) {
        return element.color == color;
      }
    };
    //set the mainImageUrl
    function setImage(url) {
      self.mainImageUrl = url;
    };
    //set the description detail
    function writeDescriptionDetail(item) {
      var finalDescInfo = '';
      if (item.partnumber !== null && item.partnumber !== 'N/A') {
        finalDescInfo += '<p>Partnumber: ' + item.partnumber + '</p>';
      };
      if (item.weight !== null && item.weight !== 'N/A') {
        finalDescInfo += '<p>Weight: ' + item.weight + '</p>';
      };
      if (item.dimension !== null && item.dimension !== 'N/A') {
        finalDescInfo += '<p>Dimension: ' + item.dimension + '</p>';
      };
      for (var i = 0; i < item.description_detail.length; i++) {
        finalDescInfo += '<p>' + item.description_detail[i].head + '</p>' + '<p>' + item.description_detail[i].desc + '</p>';
        if (item.description_detail[i].list.length >= 1) {
          finalDescInfo += '<ul>';
          item.description_detail[i].list.forEach(function (element, index) {
            finalDescInfo += '<li>' + element + '</li>';
          });
          finalDescInfo += '</ul>';
        };
      };
      return finalDescInfo;
    };

    function checkOut() {
      $mdDialog.show(checkOutConfirm).then(function () { //if "yes"
        //show the processing dialog -
        //saving the images to the local,
        //saving the scrapedItem
        showWIPDialog();
        scrapingService.saveScrapedDetail(self.item).then(function (savedItem) {
          if (savedItem == 'error') {
            $mdDialog.show(failureSaveAlert);
          }
          else {
            //fill in the weidian product model
            var newWeidianProduct = {
              itemName: ''
              , price: self.cnyPrice * self.quantity
              , stock: self.quantity
              , free_delivery: '1', //default: no post
              remote_free_delivery: '1', //default: no remote post
              bigImgs: []
              , titles: []
              , cate_id: '85697021' //category - shop.afc
              , merchant_code: savedItem.data._id
              , access_token: ''
            };
            newWeidianProduct.itemName = savedItem.data.source + ' - ' + savedItem.data.title + '\n' + 'COLOR: ' + self.color + '\n' + 'SIZE: ' + self.size + '\n' + 'Quantity: ' + self.quantity;
            var imageLocalUrls = savedItem.data.imageLocalUrls.filter(findObjectbyColor(self.color))[0].localUrls;
            newWeidianProduct.titles = ['Product Image'];

            //fill in the order model
            newOrderedItem.title = savedItem.data.source + ' - ' + savedItem.data.title;
            newOrderedItem.url = savedItem.data.url;
            newOrderedItem.partnumber = savedItem.data.partnumber;
            newOrderedItem.orderedSku = {
                  cny_price: self.cnyPrice * self.quantity,
                  color: self.color,
                  size: self.size,
                  width: self.width?self.width:'N/A'
            };
            newOrderedItem.quantity = self.quantity;
            newOrderedItem.scrapedItem = savedItem.data._id;
            newOrderedItem.imageLocalUrls = [{localUrls: imageLocalUrls}];


            weidianTokenService.weidianGetToken().then(function (tokenObj) {
              newWeidianProduct.access_token = tokenObj.data.result.access_token; //callback return is the JSON
              var imgFile = {
                img: [imageLocalUrls[0]]
                , access_token: newWeidianProduct.access_token
              };
              weidianService.uploadImage(imgFile).then(function (imgURL) {
                newWeidianProduct.bigImgs = [JSON.parse(imgURL.data).result];
                weidianService.uploadProduct(newWeidianProduct).then(function (result) {
                  var itemid = JSON.parse(result.data).result.item_id;
                  var weidianProductUrl = 'http://weidian.com/item.html?itemID=' + itemid;
                  newOrderedItem.weidianProductUrl = weidianProductUrl;
                  //saved to the order
                  orderService.saveOrder(newOrderedItem).then(function(result) {
                    if (result.data.success) {
                      $mdDialog.show(weidianRedirectConfirm).then(function () {
                        window.open(weidianProductUrl,'_blank'); //open the weidian product link
                      }, function() {
                        $mdDialog.show(checkOutReminderAlert);
                      });
                      self.disableCheckout = true;
                    } else {
                      $mdDialog.show(failureSaveAlert);
                    };
                  }, function () {//save to order error
                    $mdDialog.show(failureSaveAlert);
                  });
                }, function () { //upload product error
                  $mdDialog.show(failureAlert);
                });
              }, function () { //upload image error
                $mdDialog.show(failureAlert);
              });
            }, function () { //getting token error
              $mdDialog.show(failureAlert);
            });
          };
        }, function () { //error when saving...
          $mdDialog.show(failureSaveAlert);
        });
      }, function () { //choose the "no" in the confirmation
      });
    };
    //showing the preparing the product dialog -
    //uploading the image to weidian
    //uploading the product to the weidian
    //showing the alert dialog that we will redirect to weidian product
    //disable the checkout button


    //reset the search result
    function resetLinkInputForm() {
      $mdDialog.show(resetConfirm).then(function () {
        self.url = '';
        self.colors = [];
        self.disableLinkInput = false;
        self.detailShowing = false;
        self.formShowing = true;
        self.hidingArrowShowing = false;
      });
    };

    function showWIPDialog() {
      $mdDialog.show({
        templateUrl: 'scraping/tmpl/scraping.wipdialog.tmpl.html'
        , parent: angular.element(document.body)
        , clickOutsideToClose: false
      });
    };
  };
})();
