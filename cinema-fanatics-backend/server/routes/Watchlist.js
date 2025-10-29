// routes/Watchlist.js
const express = require("express");
const Watchlist = require("../models/Watchlist");

const router = express.Router();


// ✅ Get watchlist for logged-in user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await Watchlist.find({ userId });
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching watchlist:", err);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});
// Add to watchlist
router.post("/", async (req, res) => {
  try {
    console.log("📩 Incoming request body:", req.body);

    const newItem = new Watchlist({
      userId: req.body.userId,
      tmdbId: req.body.tmdbId,
      title: req.body.title,
      posterUrl: req.body.posterUrl,
      year: req.body.year,
      rating: req.body.rating,
      genre: req.body.genre,
      watched: req.body.watched || false,
    });
    

    const savedItem = await newItem.save();
    console.log("✅ Watchlist item saved:", savedItem);
    res.status(201).json(savedItem);

  } catch (err) {
    console.error("❌ Error saving watchlist item:", err); // full error
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


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
