import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

// Evitamos error de cors
app.use(cors());

app.use(express.json());

// Endpoint para obtener todos los autos
app.get("/cars", (req, res) => {
  db.query("SELECT * FROM cars", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Endpoint para obtener un auto por id
app.get("/cars/:id", (req, res) => {
  db.query("SELECT * FROM cars WHERE id = ?", [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.json(results[0]);
  });
});

app.listen(process.env.SV_PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.SV_PORT}`);
});
