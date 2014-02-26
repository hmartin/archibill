angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $location, $ionicPlatform, queryService, localStorage) {
        $scope.user = new Array();
          $scope.picture = "angular";
        console.log('ionic home');
          $ionicPlatform.ready(function() {
              var device = ionic.Platform.platform();
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
        
        $scope.showTipsChange = function() {
            localStorage.set('dontShowTips',$scope.user.dontShowTips)
        }
        
        function insertPhotoSuccess(tx, result) {
            url = '/tab/choose/'+result.insertId;
            $scope.$apply(function() {
                $location.path( url );
                if(!$scope.$$phase) $scope.$apply();
                console.log('real: '+$location.path());
            });

    })

    .controller('choose', function($scope, $location, $stateParams, queryService, categoryService) {
         queryService.execute('imageSelect', [$stateParams.iid], function querySuccess(tx, results) {
             $scope.image = angular.copy(results.rows.item(0));
             $scope.$apply();
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

    .controller('option', function($scope,localStorage, $location) {
        $scope.user = new Array();
        if (localStorage.get("email")) {
            $scope.user.email = localStorage.get("email");
        } else {
            $scope.noEmail = 1;
        }

        $scope.saveEmail = function (user) {
            localStorage.set('email', user.email);
            $scope.noEmail = 0;
        }
        //uiid, email
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