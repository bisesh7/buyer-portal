import db from "../db/database.js";

export const getFavoritesByUserId = (req, res) => {
  const query = `
        SELECT properties.*
        FROM favorites
        JOIN properties ON favorites.property_id = properties.id
        WHERE favorites.user_id =?
    `;
  console.log("SECRET:", process.env.JWT_SECRET);

  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const addFavorite = (req, res) => {
  const { property_id } = req.params;
  const query = "INSERT INTO favorites (user_id, property_id) VALUES (?, ?)";

  db.run(query, [req.user.id, property_id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Property added to favorites" });
  });
};

export const removeFavorite = (req, res) => {
  const { property_id } = req.params;
  const query = "DELETE FROM favorites WHERE user_id = ? AND property_id = ?";

  db.run(query, [req.user.id, property_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.json({ message: "Property removed from favorites" });
  });
};
