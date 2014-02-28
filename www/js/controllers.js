angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $location, $ionicPlatform, queryService, localStorage) {
          $scope.picture = "angular";
        console.log('ionic home');
          $ionicPlatform.ready(function() {
              var device = ionic.Platform.device();
              console.log('device:'+device);
              if (typeof destinationType != 'undefined') {
                  pictureSource=navigator.camera.PictureSourceType;
                  destinationType=navigator.camera.DestinationType;
                  console.log('navigator.camera ready');
              }
          });
        $scope.takePicture = function(tips) {
            console.log('tips display:'+tips);
            if (true || (!localStorage.get('showTips') && tips)) {
                $location.path('/tab/tips');
            }
        };
        $scope.savePicture = function(value) {
            console.log('watch myPic value:' +value);
           if(value && value != "angular") {
               $scope.imageData = value;
               console.log('image success');
               queryService.execute('imageInsert', [value], insertPhotoSuccess);
           }
        };
        
        function insertPhotoSuccess(tx, result) {
            url = '/tab/choose/'+result.insertId;
                console.log('real: '+url);
            $scope.$apply(function() {
                $location.path( url );
                if(!$scope.$$phase) $scope.$apply();
                console.log('real: '+$location.path());
            });
        }

        $scope.saveChange = function(key) {
            localStorage.set(key,$scope.user[key])
        }

        $scope.user = localStorage.init();
    })

    .controller('choose', function($scope, $location, $stateParams, queryService, categoryService) {
         queryService.execute('imageSelect', [$stateParams.iid], function querySuccess(tx, results) {
             $scope.$apply(function() {
                 $scope.image = angular.copy(results.rows.item(0));
             });
         });

        $scope.updateImage = function (image) {
            console.log(image);
            queryService.execute('imageUpdateCategory', [image.name, image.category_id, $scope.image.id]);
            $location.path('/tab/home');
        }
        
        categoryService.getCategories().then( function(categories) {
            $scope.categories =categories;
        });
    })

    /********************** MANAGE CATEGORY ******************************/
    .controller('category', function($scope, $location, queryService, categoryService) {
        
        $scope.saveCategory = function (category) {
            p = !category.parent ? 0 : category.parent;
            queryService.execute('categoryInsert', [category.name, p]);
            $location.path('/tab/category');
        }

        $scope.deleteCategory = function (id) {
            queryService.execute('categoryDelete', [id], upCategories);
        }

        categoryService.getCategories().then( function(categories) {
            $scope.categories =categories;
        });
    })

    /********************** MANAGE CATEGORY ******************************/
    .controller('search', function($scope, $location, queryService, imageService) {

        $scope.deleteImage = function (id) {
            queryService.execute('categoryImage', [id], upCategories);
        }

        imageService.getImages().then( function(images) {
            $scope.images =images;
        });
    })

    .controller('send', function($scope,queryService) {

        queryService.execute('categoryDrop');
        queryService.execute('imageDrop');
        queryService.execute('categoryCreate', null, createSuccess);

        function createSuccess() {
            initCatValues =  [["home", 0],["furniture", 1],["kitchen", 1],,["garden", 1],["electronics", 0],["computer", 5],["phone", 5],["services", 0]];
            angular.forEach(initCatValues, function(value, key){
                queryService.execute('categoryInsert', value);
            });
        }
        queryService.execute('imageCreate');
    })
;