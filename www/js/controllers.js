angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $location, $ionicPlatform, queryService) {

        $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
            alert(destinationType);
        });


        $scope.takePicture = function(tips) {
            if (tips) {
                $location.path('/tab/tips');
            } else {
                if (destinationType != 'undefined') {
                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                        quality: 40,
                        correctOrientation: 1,
                        allowEdit: true,
                        destinationType: DestinationType.FILE_URI  });
                } else {
                    onPhotoDataSuccess('img/ionic.png');
                }
            }
        };

        function onPhotoDataSuccess(imageURI) {
            $scope.uri = imageURI;

            queryService.execute('imageInsert', [imageURI], insertPhotoSuccess);
            /* asynchr post
             */
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

    .controller('option', function($scope, $stateParams, MyService) {
        $scope.data = MyService.doStuff();
        $scope.email = window.localStorage.getItem("email");
    })

    .controller('OptionsEmailCtrl', function($scope ) {
        $scope.email = '<input type="text" placeholder="'+window.localStorage.getItem("email")+'">';
    })


    /********************** MANAGE CATEGORY ******************************/
    .controller('category', function($scope, $location,queryService, categoryService) {
        
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