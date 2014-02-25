angular.module('starter.directives', [])

.directive('camera', function() {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
         elm.bind('click', function() {
            if (typeof destinationType != 'undefined') {
                navigator.camera.getPicture(function (imageURI) {
                   scope.$apply(function() {
                      ctrl.$setViewValue(imageURI);
                   });
                }, function (err) {
                   ctrl.$setValidity('error', false);
                }, { quality: 50, destinationType: Camera.DestinationType.FILE_URI })
            } else {
               ctrl.$setViewValue('img/ionic.png');
            }
         });
      }
   };
});