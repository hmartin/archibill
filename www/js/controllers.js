'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl1', [function() {

  }]);


function distance(lat_a, lon_a, lat_b, lon_b)  {
    var a = Math.PI / 180; var lat1 = lat_a * a; var lat2 = lat_b * a; var lon1 = lon_a * a; var lon2 = lon_b * a;
    var t1 = Math.sin(lat1) * Math.sin(lat2); var t2 = Math.cos(lat1) * Math.cos(lat2);
    var t3 = Math.cos(lon1 - lon2); var t4 = t2 * t3; var t5 = t1 + t4; var rad_dist = Math.atan(-t5/Math.sqrt(-t5 * t5 +1)) + 2 * Math.atan(1);
    return (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446; }

// onError Callback receives a PositionError object
//
function onError(error) {
    console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}
