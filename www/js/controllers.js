angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $location, $ionicPlatform, queryService, localStorage) {
        $scope.user = new Array();
        console.log('ionic home');
          $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
              console.log('ionic ready');
          });
        $scope.takePicture = function(tips) {
            if (!localStorage.get('showTips') && tips) {
                $location.path('/tab/tips');
            } else {
                if (typeof destinationType != 'undefined') {
                    console.log(navigator.camera.DestinationType.FILE_URI);
                    navigator.camera.getPicture(function onPhotoDataSuccess(imageURI) {
                        $scope.uri = imageURI;
                        console.log(imageURI);
                        queryService.execute('imageInsert', [imageURI], insertPhotoSuccess);
                        /* asynchr post
                         */
                    }, null, {
                        quality: 40,
                        correctOrientation: 1,
                        allowEdit: true,
                        destinationType: navigator.camera.DestinationType.FILE_URI  });
                } else {
                    onPhotoDataSuccess('img/ionic.png');
                }
            }
        };

        $scope.showTipsChange = function() {
            localStorage.set('dontShowTips',$scope.user.dontShowTips)
        }

        
        function insertPhotoSuccess(tx, result) {
            url = '/tab/choose/'+result.insertId;
            console.log(url);
            $location.path( url );
        }
    })

    .controller('choose', function($scope, $location, $stateParams, queryService, categoryService) {
         queryService.execute('imageSelect', [$stateParams.iid], function querySuccess(tx, results) {
             $scope.image = angular.copy(results.rows.item(0));
             $scope.$apply();
         });

        function upCategories() {
            categoryService.getCategories().then( function(categories) {
                $scope.categories =categories;
            });
        }

        $scope.updateImage = function (image) {
            console.log(image);
            queryService.execute('imageUpdateCategory', [image.name, image.category_id, $scope.image.id]);
            $location.path('/tab/home');
        }

        upCategories();

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
        //uiid, email, password
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

        function upCategories() {
            categoryService.getCategories().then( function(categories) {
                $scope.categories =categories;
            });
        }

        upCategories();
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