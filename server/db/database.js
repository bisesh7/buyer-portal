const sqlite = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite.Database(
  path.join(__dirname, "database.sqlite"),
  (err) => {
    path.join(__dirname, "database.sqlite");
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  },
);

module.exports = db;
