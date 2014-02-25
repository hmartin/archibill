angular.module('starter.directives', [])

.directive('camera', function() {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
             console.log('directive camera');
         elm.bind('click', function() {
             console.log('directive camera bind');
            if (typeof destinationType != 'undefined') {
             console.log('getPic');
                navigator.camera.getPicture(function (imageURI) {
                   scope.$apply(function() {                    
                       console.log('directive camera bind if apply setValue');
                      scope.picture = imageURI;
                   });
                }, function (err) {
                   ctrl.$setValidity('error', false);
                }, { quality: 50, destinationType: Camera.DestinationType.FILE_URI })
            } else {
                scope.$apply(function() {
                    console.log('directive camera bind else apply setValue');
                    scope.picture = Math.random()+'img/ionic.png';
                });
            }
         });
      }
   };
});