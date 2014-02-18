angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $stateParams, $state, $ionicPlatform, queryService) {

        $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        });

        queryService.execute('categoryDrop');
        queryService.execute('categoryCreate', null, createSuccess);
        queryService.execute('imageCreate');

        function createSuccess() {
            $init =  [["home", 0],["furniture", 1],["kitchen", 1],,["garden", 1],["electronics", 0],["computer", 5],["phone", 5],["services", 0]];

        }
        $scope.takePicture = function(tips) {
            if (tips) {
                $scope.template = 'template/tips.html';
            }
            if (typeof navigator.camera != 'undefined') {
                navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                    quality: 40,
                    correctOrientation: 1,
                    allowEdit: true,
                    destinationType: navigator.camera.DestinationType.FILE_URI  });
            } else {
                onPhotoDataSuccess('img/ionic.png');
            }
        };

        function onPhotoDataSuccess(imageURI) {
            $scope.uri = imageURI;

            executeSql(queryService.get('imageSelect'), [imageURI, imageURI], insertPhotoSuccess);
            /* asynchr post
             */
        }
        
        function insertPhotoSuccess(tx, result) {
            url = '#/tabs/choose/'+result.insertId;
            console.log(url);
            $scope.$apply( $location.path( url ) );
        }
    })


    .controller('choose', function($scope, $stateParams, MyService) {
        
    })

    .controller('option', function($scope, $stateParams, MyService) {
        $scope.data = MyService.doStuff();
        $scope.email = window.localStorage.getItem("email");
    })

    .controller('OptionsEmailCtrl', function($scope ) {
        $scope.email = '<input type="text" placeholder="'+window.localStorage.getItem("email")+'">';
    })


    /********************** MANAGE CATEGORY ******************************/
    .controller('manage', function($scope, $stateParams, $ionicModal, queryService) {

        $ionicModal.fromTemplateUrl('templates/modals/createCategory.html',
            function(modal) { $scope.category = null;$scope.modal = modal; },
            {
                scope: $scope,
                animation: 'slide-in-up'
            }
        );

        $scope.createCategoryModal = function () {
            $scope.modal.show();
        }
        
        $scope.saveCategory = function (category) {
            p = !category.parent ? 0 : category.parent;
            
            console.log(p);
            queryService.exexute('categoryInsert', [category.name, p]);
            getCategories();
            $scope.modal.hide();
        }
        
        $scope.deleteCategory = function (id) {
            console.log('delete'+id);
            queryService.exexute('categoryDelete', [id]);
        }
        
        function getCategories() {
            queryService.exexute('categorySelectAll', null, querySuccess);
        }

        function querySuccess(tx, results) {
            $scope.categories =new Array();
            for (var i=0; i < results.rows.length; i++){
                $scope.categories[i]  = results.rows.item(i);
            }
            $scope.$apply();
        }
        getCategories();
    })


    .controller('send', function($scope, $stateParams) {

    })
;




function onFail(message) {
    alert('Failed because: ' + message);
}

function populateDB(queryService) {
    //$result = mysql_query("SHOW TABLES LIKE 'myTable'");
    //$tableExists = mysql_num_rows($result) > 0;
}

