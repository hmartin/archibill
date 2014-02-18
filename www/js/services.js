angular.module('starter.services', [])

.factory('queryService', function() {
    
    var queries = {
    categoryInsert: 'INSERT INTO Category (name, parent_id) VALUES (?,?)',
    categoryDelete: 'DELETE FROM Category WHERE id = ?'
    };

  return {
    get: function(queryId) { return queries[queryId]; }
  }
})

.service('MyService', function($http) {
    var myData = null;

    var promise = $http.get('http://izidot.com/json.json').success(function (data) {
        myData = data;
    });

    return {
        promise:promise,
        doStuff: function () {
            return myData;//.getSomeData();
        }
    };
})
.filter('ucfirst', function() {
    return function(input, scope) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

