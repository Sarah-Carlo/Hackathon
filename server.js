const express = require("express");
const cors = require("cors");
const db = require("./db"); // your db file name

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all universities
app.get("/universities", (req, res) => {
  db.all("SELECT * FROM universities", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Filter by country (optional but cool)
app.get("/universities/country/:country", (req, res) => {
  const country = req.params.country;
  db.all(
    "SELECT * FROM universities WHERE Country = ?",
    [country],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
