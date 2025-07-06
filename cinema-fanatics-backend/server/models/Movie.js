// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genres: [String],
  director: String,
  plot: String,
  poster: String,
  backdrop: String,
  imdb: {
    id: String,
    rating: Number,
    votes: Number
  },
  runtime: Number,
  revenue: Number,
  tagline: String,
  language: String,
  production_countries: [String],
  spoken_languages: [String],
  keywords: [String]
});

// ✅ Proper CommonJS export
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
