angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $stateParams, $state, $ionicPlatform, queryService) {

        $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        });

        populateDB();

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
            
            $sql ='INSERT INTO Image (name, uri, category_id) VALUES (?,?,0)';
            executeSql($sql, [imageURI, imageURI], insertPhotoSuccess);
            /* asynchr post
             suggest cat
             */
        }
        
        function insertPhotoSuccess(tx, result) {
            url = '#/tabs/choose/'+result.insertId;
            console.log(url);
            $scope.$apply( $location.path( url ) );
        }
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
            executeSql(queryService.get('categoryInsert'), [category.name, p]);
            getCategories();
            $scope.modal.hide();
        }
        
        $scope.deleteCategory = function (id) {
            console.log('delete'+id);
            executeSql(queryService.get('categoryDelete'), [id]);
            getCategories();
        }
        
        $scope.rootOnly = function(category) {
            if(category.parent_id == 0 ) {
                return true;
            }
            return false;
        };
        function getCategories() {
            $sql = 'SELECT * FROM Category c ORDER BY case when c.parent_id = 0 then c.name else (select c2.name from Category c2 WHERE c2.id = c.parent_id) end, case when c.parent_id = 0 then 1 end desc, c.name';
            executeSql($sql, [], querySuccess);
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
var onSuccessFct = function onSuccess(tx, results) {
}
function executeSql (sql, values, onSuccessFct) {
   values = typeof values !== 'undefined' ? values : null;
   onSuccessFct = typeof onSuccessFct !== 'undefined' ? onSuccessFct : null;
   console.log(sql);console.log(values);
   db.transaction(function (tx) {
       tx.executeSql(sql, values, onSuccessFct);
   });
}

function populateDB() {
    //$result = mysql_query("SHOW TABLES LIKE 'myTable'");
    //$tableExists = mysql_num_rows($result) > 0;
    executeSql('DROP TABLE IF EXISTS Category');
    executeSql('CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY AUTOINCREMENT, name, parent_id)', null, createSuccess);
    executeSql('CREATE TABLE IF NOT EXISTS Image (id INTEGER PRIMARY KEY AUTOINCREMENT, name, uri, category_id)');
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
