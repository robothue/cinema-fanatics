// routes/movieRoutes.js
const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// GET /api/movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().limit(30);
    res.json(movies);
  } catch (err) {
    console.error("❌ Failed to fetch movies:", err.message);
    res.status(500).json({ message: "Failed to fetch movies", error: err.message });
  }
});

// GET /api/movies/:id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    console.error("❌ Error fetching movie by ID:", err.message);
    res.status(500).json({ message: "Error fetching movie", error: err.message });
  }
});

module.exports = router;
