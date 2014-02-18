angular.module('starter.services', [])

.factory('QueryService', function() {
    
  var queries = [
    categoryInsert: 'INSERT INTO Category (name, parent_id) VALUES (?,?)',
    categoryDelete: 'DELETE FROM Category WHERE id = ?'
  ];

  return {
    get: function(queryId) { return queries[queryId]; }
  }
})

.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var categorie = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
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
});
.filter('ucfirst', function() {
    return function(input, scope) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

