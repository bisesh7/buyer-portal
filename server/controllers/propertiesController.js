import db from "../db/database.js";

export const getAllProperties = (req, res) => {
  const query = "SELECT * FROM properties";

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

export const getPropertyById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM properties WHERE id = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(row);
  });
};
