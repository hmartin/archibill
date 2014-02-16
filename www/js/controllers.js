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
            function(modal) { $scope.modal = modal; },
            {
                scope: $scope,
                animation: 'slide-in-up'
            }
        );

        $scope.createCategoryModal = function () {
            $scope.modal.show();
        }
        $scope.rootOnly = function(categorie)
        {
            if(categorie.level == 0 )
            {
                return true;
            }
            return false;
        };
        function getCategories(level) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Category WHERE level <= '+level+' ORDER BY parent_id, level', [], querySuccess, null);
            });
        }

        function querySuccess(tx, results) {
            console.log(results);
            $scope.categories =new Array();
            for (var i=0; i < results.rows.length; i++){
                $scope.categories[i]  = results.rows.item(i);
            }

            $scope.$apply(); //trigger digest
        }
        getCategories(2);
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
    tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id unique, name, parent_id, level)');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (1, "Home", 1, 0) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (2, "Furniture", 1, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (3, "Kitchen", 1, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (4, "Garden", 1, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (5, "Electronics", 5, 0) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (6, "Computer", 5, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (7, "Phone", 5, 1) ');
    tx.executeSql('INSERT INTO Category (id, name, parent_id, level) VALUES (8, "Services", 8, 0) ');

}
