// routes/Watchlist.js
const express = require("express");
const Watchlist = require("../models/Watchlist");

const router = express.Router();

// ✅ GET all watchlist items for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await Watchlist.find({ userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});




// Add to watchlist
router.post("/", async (req, res) => {
  try {
    console.log("📩 Incoming request body:", req.body);

    const newItem = new Watchlist({
      userId: req.body.userId,
      movieId: req.body.movieId,
      title: req.body.title,
      posterPath: req.body.posterPath,
    });

    const savedItem = await newItem.save();
    console.log("✅ Watchlist item saved:", savedItem);
    res.status(201).json(savedItem);

  } catch (err) {
    console.error("❌ Error saving watchlist item:", err); // full error
    res.status(500).json({ error: "Server error", details: err.message });
  }
});






// // ✅ POST add movie to watchlist
// router.post("/", async (req, res) => {
//   try {
//     const { userId, tmdbId, title, posterUrl, year, rating, genre, watched } = req.body;

//     // Prevent duplicates
//     const exists = await Watchlist.findOne({ userId, tmdbId });
//     if (exists) {
//       return res.status(400).json({ error: "Movie already in watchlist" });
//     }

//     const newMovie = await Watchlist.create({
//       userId,
//       tmdbId,
//       title,
//       posterUrl,
//       year,
//       rating,
//       genre,
//       watched,
//     });

//     res.status(201).json(newMovie);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add movie" });
//   }
// });

// ✅ DELETE movie from watchlist
router.delete("/:userId/:tmdbId", async (req, res) => {
  try {
    const { userId, tmdbId } = req.params;
    await Watchlist.findOneAndDelete({ userId, tmdbId });
    res.json({ message: "Movie removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove movie" });
  }
});

module.exports = router;
