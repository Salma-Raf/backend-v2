const mysql = require("mysql");

exports.db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "deliver",
});
