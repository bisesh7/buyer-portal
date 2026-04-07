import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(
  path.join(__dirname, "database.sqlite"),
  (err) => {
    if (err) console.error("DB connection error:", err.message);
    else console.log("Connected to SQLite DB");
  },
);

db.run("PRAGMA foreign_keys = ON");

export default db;
