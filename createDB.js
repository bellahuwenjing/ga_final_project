var sqlite3 = require('sqlite3').verbose();
// in memory database (not persisted) use a string filename for a persistant file.
// var db = new sqlite3.Database(':memory:')
var db = new sqlite3.Database('myDB');

db.serialize(function () {

    db.run("CREATE TABLE IF NOT EXISTS User (name TEXT, password TEXT, comment TEXT, option TEXT)");

    db.run("DELETE FROM User");
});

db.close();