angular.module('starter.services', [])

.factory('queryService', function() {
    var queries = {
        categoryDrop: 'DROP TABLE IF EXISTS Category',
        categoryCreate: 'CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY AUTOINCREMENT, name, parent_id)',
        categoryInsert: 'INSERT INTO Category (name, parent_id) VALUES (?,?)',
        categoryDelete: 'DELETE FROM Category WHERE id = ?',
        categorySelectAll: 'SELECT * FROM Category c ORDER BY case when c.parent_id = 0 then c.name else (select c2.name from Category c2 WHERE c2.id = c.parent_id) end, case when c.parent_id = 0 then 1 end desc, c.name',
        imageCreate: 'CREATE TABLE IF NOT EXISTS Image (id INTEGER PRIMARY KEY AUTOINCREMENT, name, uri, category_id)',
        imageSelect: 'INSERT INTO Image (name, uri, category_id) VALUES (?,?,0)'
    };
    
  return {
      excute: function(queryId, values, onSuccessFct) { 
          values = typeof values !== 'undefined' ? values : null;
          onSuccessFct = typeof onSuccessFct !== 'undefined' ? onSuccessFct : null;
          console.log(sql);console.log(values);
          db.transaction(function (tx) {
              tx.executeSql(queries[queryId], values, onSuccessFct);
          });
      }
  }
})

.service('categoryService', function($http) {
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
})
.filter('rootOnly', function() {
    return function(category) {
            if(category.parent_id == 0 ) {
                return true;
            }
            return false;
        }
});

