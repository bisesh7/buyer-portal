import db from "./database.js";

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'buyer'
        )
    `);

  db.run(`
       CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
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
        (1, 'City Center Apartment', 'New York', 500000),
        (2, 'Beachfront Villa', 'California', 1200000),
        (3, 'Luxury Condo', 'Miami', 800000),
        (4, 'Suburban House', 'Austin', 450000),
        (5, 'Downtown Loft', 'Chicago', 600000),
        (6, 'Mountain Cabin', 'Colorado', 350000),
        (7, 'Penthouse Suite', 'Los Angeles', 2000000),
        (8, 'Countryside Cottage', 'Vermont', 300000),
        (9, 'Riverside Townhouse', 'Seattle', 700000),
        (10, 'Modern Studio', 'San Francisco', 550000)    
    `,
    (err) => {
      if (err) console.error("Error inserting properties:", err.message);
    },
  );

  console.log("Database initialized with tables amd mock properties!");
});

export default db;
