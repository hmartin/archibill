angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $stateParams, $ionicModal, $ionicPlatform) {

        $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        });


        db.transaction(populateDB);

        /*$ionicModal.fromTemplateUrl('templates/modals/tips.html', function(modal) {
            $scope.modal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });*/

        $scope.openTipsDialog = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 40,
                correctOrientation: 1,
                allowEdit: true,
                destinationType: navigator.camera.DestinationType.FILE_URI  });
            $scope.modal.hide();
        };
    })


    .controller('option', function($scope, $stateParams, MyService) {
        $scope.data = MyService.doStuff();
        $scope.email = window.localStorage.getItem("email");
    })

    .controller('OptionsEmailCtrl', function($scope ) {
        $scope.email = '<input type="text" placeholder="'+window.localStorage.getItem("email")+'">';
    })


    /********************** MANAGE CATEGORY ******************************/
    .controller('manage', function($scope, $stateParams, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/modals/createCategory.html',
            function(modal) { $scope.modal = modal; },
            {
                scope: $scope,
                animation: 'slide-in-up'
            }
        );

        $scope.createCategoryModal = function () {
            $scope.modal.show();
        }
        
        $scope.saveCategory = function () {
            console.log('saveCatFct');
            db.transaction(function (tx) {
                $sql ='INSERT INTO Category (id, name, parent_id, level) VALUES ("", ?,?,1)';
                tx.executeSql($sql, [$scope.name, $scope.category], saveCategorySuccess);
            });
            $scope.modal.hide();
        }
        
        $scope.saveCategory = function (id) {
            console.log('delete'+id);
            db.transaction(function (tx) {
                $sql ='DELETE FROM Category WHERE id = ?';
                tx.executeSql($sql, [id], saveCategorySuccess);
            });
            getCategories();
        }
        
        $scope.rootOnly = function(category) {
            if(category.level == 0 ) {
                return true;
            }
            return false;
        };
        function getCategories() {
            db.transaction(function (tx) {
                $sql = 'SELECT * FROM Category ORDER BY parent_id, level';
                tx.executeSql($sql, [], querySuccess, null);
            });
        }

        function querySuccess(tx, results) {
            console.log(results.item(0));
            $scope.categories =new Array();
            for (var i=0; i < results.rows.length; i++){
                $scope.categories[i]  = results.rows.item(i);
            }
            $scope.$apply(); //trigger digest
        }
        getCategories();
    })


    .controller('send', function($scope, $stateParams) {

    })
;




function onPhotoDataSuccess(imageURI) {
    uri = imageURI;
    /* asynchr post
    save to bdd
    suggest cat
     */
}

function onFail(message) {
    alert('Failed because: ' + message);
}



function populateDB(tx) {
    //$result = mysql_query("SHOW TABLES LIKE 'myTable'");
    //$tableExists = mysql_num_rows($result) > 0;
    tx.executeSql('DROP TABLE IF EXISTS Category');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id INTEGER AUTO_INCREMENT, name, parent_id, level)', [], createSuccess);
}

function createSuccess() {
   db.transaction(function (tx) {
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Home", 1, 0) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Furniture", 1, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Kitchen", 1, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Garden", 1, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Electronics", 5, 0) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Computer", 5, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Phone", 5, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES ("", "Services", 8, 0) ');
   });
}
