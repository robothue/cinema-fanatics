// controllers/movieController.js
const Movie = require("../models/Movie");
const Comment= require("../models/Comment");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().limit(20); // limit for testing
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies", error: err });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    // Fetch movie
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Fetch related comments
    const comments = await Comment.find({ movie_id: movieId })
  .select("name text date") // only these fields
  .sort({ date: -1 });
    res.json({ movie, comments });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movie detail", error: err });
  }
};