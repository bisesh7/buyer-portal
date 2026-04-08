import db from "./database.js";

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'buyer'
        )
    `);

  db.run(`
       CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            location TEXT,
            price REAL NOT NULL) 
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            property_id INTEGER NOT NULL,
            UNIQUE(user_id, property_id),   
            
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
        )
    `);

  db.run(
    `
    INSERT OR IGNORE INTO properties (id, title, location, price) VALUES
      (1, 'City Center Apartment', 'Kathmandu', 5000000),
      (2, 'Riverside Villa', 'Pokhara', 12000000),
      (3, 'Luxury Condo', 'Lalitpur', 8000000),
      (4, 'Suburban House', 'Bhaktapur', 4500000),
      (5, 'Downtown Loft', 'Biratnagar', 6000000),
      (6, 'Mountain Cabin', 'Namche Bazaar', 3500000),
      (7, 'Penthouse Suite', 'Chitwan', 20000000),
      (8, 'Countryside Cottage', 'Bandipur', 3000000),
      (9, 'Riverside Townhouse', 'Dhulikhel', 7000000),
      (10, 'Modern Studio', 'Janakpur', 5500000)
    `,
    (err) => {
      if (err) console.error("Error inserting properties:", err.message);
    },
  );

  console.log("Database initialized with tables amd mock properties!");
});

export default db;
