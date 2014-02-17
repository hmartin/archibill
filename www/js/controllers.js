angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $stateParams, $ionicModal, $ionicPlatform) {

        $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        });


        db.transaction(populateDB);

        $ionicModal.fromTemplateUrl('templates/modals/tips.html', function(modal) {
            $scope.modal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

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
            if (!category.parent) {
                p=0;
            } else {
                p=category.parent;
            }
            console.log(p);
            db.transaction(function (tx) {
                $sql ='INSERT INTO Category (name, parent_id) VALUES (?,?)';
                tx.executeSql($sql, [category.name, p]);
            });
            getCategories();
            $scope.modal.hide();
        }
        
        $scope.deleteCategory = function (id) {
            console.log('delete'+id);
            db.transaction(function (tx) {
                $sql ='DELETE FROM Category WHERE id = ?';
                tx.executeSql($sql, [id]);
            });
            getCategories();
        }
        
        $scope.rootOnly = function(category) {
            if(category.parent_id == 0 ) {
                return true;
            }
            return false;
        };
        function getCategories() {
            db.transaction(function (tx) {
                $sql = 'SELECT * FROM Category c ORDER BY case when c.parent_id = 0 then c.name else (select c2.name from Category c2 WHERE c2.id = c.parent_id) end, case when c.parent_id = 0 then 1 end desc, c.name';
                tx.executeSql($sql, [], querySuccess, null);
            });
        }

        function querySuccess(tx, results) {
            //console.log(results.item(0));
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
    tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY AUTOINCREMENT, name, parent_id)', null, createSuccess);
}

function createSuccess() {
   db.transaction(function (tx) {
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("home", 0) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("furniture", 1) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("kitchen", 1) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("garden", 1) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("electronics", 0) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("computer", 5) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("phone", 5) ');
    tx.executeSql('INSERT INTO Category (name, parent_id) VALUES ("services", 0) ');
   });
}
