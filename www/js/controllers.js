angular.module('starter.controllers', ['ionic'])


    .controller('home', function($scope, $stateParams, $ionicModal) {

        //var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        //db.transaction(populateDB, errorCB, successCB);
        //pictureSource=navigator.camera.PictureSourceType;
        //destinationType=navigator.camera.DestinationType;

        $ionicModal.fromTemplateUrl('templates/tips.html', function(modal) {
            $scope.modal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.openInvitationDialog = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 40,
                correctOrientation: 1,
                allowEdit: true,
                destinationType: navigator.camera.DestinationType.FILE_URI  });
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








function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {

}