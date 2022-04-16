var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("myDB");

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS Movies (id TEXT, title TEXT)");

  // db.run("DELETE FROM Movies");
});

db.close();
