angular.module('starter.services', [])

.factory('queryService', function() {
    var queries = {
        categoryDrop: 'DROP TABLE IF EXISTS Category',
        categoryCreate: 'CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY AUTOINCREMENT, name, parent_id)',
        categoryInsert: 'INSERT INTO Category (name, parent_id) VALUES (?,?)',
        categoryDelete: 'DELETE FROM Category WHERE id = ?',
        categorySelectAll: 'SELECT * FROM Category c ORDER BY case when c.parent_id = 0 then c.name else (select c2.name from Category c2 WHERE c2.id = c.parent_id) end, case when c.parent_id = 0 then 1 end desc, c.name',
        imageDrop: 'DROP TABLE IF EXISTS Image',
        imageCreate: 'CREATE TABLE IF NOT EXISTS Image (id INTEGER PRIMARY KEY AUTOINCREMENT, name, uri, category_id)',
        imageInsert: 'INSERT INTO Image (uri, category_id) VALUES (?,0)',
        imageSelect: 'SELECT * FROM Image WHERE id = ? ',
        imageSelectAll: 'SELECT * FROM Image ORDER BY name',
        imageUpdateCategory: 'UPDATE Image SET name = ? , category_id = ? WHERE id = ? '
    };
    
  return {
      execute: function(queryId, values, onSuccessFct) {
          var db = window.openDatabase("Checkbill", "1.0", "Checkbill Info", 200000);
          values = typeof values !== 'undefined' ? values : null;
          onSuccessFct = typeof onSuccessFct !== 'undefined' ? onSuccessFct : null;
          console.log(queries[queryId]);
          db.transaction(function (tx) {
              tx.executeSql(queries[queryId], values, onSuccessFct);
          });
      }
  }
})

    .service('categoryService', function($rootScope, $q, queryService) {
        return {
            getCategories: function () {
                var deferred = $q.defer();
                queryService.execute('categorySelectAll', null, function (tx, results) {
                    categories =new Array();
                    for (var i=0; i < results.rows.length; i++){
                        categories[i]  = results.rows.item(i);
                    }
                    console.log(categories);
                    $rootScope.$apply(function() { deferred.resolve(categories); });
                });
                return deferred.promise;
            }
        };
    })
    .service('imageService', function($rootScope, $q, queryService) {
        return {
            getImages: function () {
                var deferred = $q.defer();
                queryService.execute('imageSelectAll', null, function (tx, results) {
                    images =new Array();
                    for (var i=0; i < results.rows.length; i++){
                        images[i]  = results.rows.item(i);
                    }
                    console.log(images);
                    $rootScope.$apply(function() { deferred.resolve(images); });
                });
                return deferred.promise;
            }
        };
    })
    .service('localStorage', function() {
        return {
            get: function (item) {
                return window.localStorage.getItem(item);
            },
            set: function (key, item) {
                return window.localStorage.setItem(key, item);
            },
            remove: function (item) {
                return window.localStorage.removeItem(item);
            }
        };
    })
    .filter('rootOnly', function() {
        return function( items ) {
            var categories = [];
            angular.forEach(items, function(item) {
                if( item.parent_id == 0) {
                    categories.push(item);
                }
            });
            return categories;
        };
    })
.filter('ucfirst', function() {
    return function(input, scope) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

