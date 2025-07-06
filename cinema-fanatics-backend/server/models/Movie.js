// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genres: [String],
  plot: String,
  fullplot: String,
  poster: String,
  cast: [String],
  directors: [String],
  runtime: Number,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number
    }
  }
}, { collection: "movies" }); // important: match actual collection name

module.exports = mongoose.model("Movie", movieSchema);
