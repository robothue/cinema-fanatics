const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tmdbId: { type: Number, required: true },
  title: { type: String, required: true },
  posterUrl: { type: String },
  year: { type: String },
  rating: { type: Number },
  genre: { type: [String] },
  watched: { type: Boolean, default: false },
}, { timestamps: true });

// Export properly for CommonJS
module.exports = mongoose.model("Watchlist", WatchlistSchema);
