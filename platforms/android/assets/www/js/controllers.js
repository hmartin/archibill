angular.module('starter.controllers', ['ionic'])

    .controller('home', function($scope, $stateParams, $ionicModal, $ionicPlatform) {

        $ionicPlatform.ready(function() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;



        });


        var db = window.openDatabase("Checkbill", "1.0", "Checkbill Info", 200000);
        db.transaction(populateDB, errorCB, successCB);

        $ionicModal.fromTemplateUrl('templates/tips.html', function(modal) {
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

    .controller('manage', function($scope, $stateParams) {
        window.localStorage.setItem("email", 'arol@free.fr');

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
    tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id unique, data)');
    tx.executeSql('INSERT INTO Category (id, name) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO Category (id, data) VALUES (2, "Second row")');


}

function getCategories(tx) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Category', [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            document.querySelector('#status').innerHTML +=  msg;
            for (i = 0; i < len; i++){
                msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                document.querySelector('#status').innerHTML +=  msg;
            }
        }, null);
    });
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {

}