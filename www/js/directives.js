angular.module('starter.directives', [])

.directive('camera', function() {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, elm, attrs, ctrl) {
             console.log('directive camera');
         elm.bind('click', function() {
             console.log('directive camera bind');
            if (typeof navigator.camera != 'undefined') {
             console.log('getPic');
                navigator.camera.getPicture(function (imageURI) {
                $scope.$apply(function() {
                    $scope.savePicture(imageURI);
                });
                }, function (err) {
                   ctrl.$setValidity('error', false);
                }, { quality: 50, destinationType: Camera.DestinationType.FILE_URI })
            } else {
                $scope.$apply(function() {
                    $scope.savePicture('img/ionic.png');
                });
            }
         });
      }
   };
});