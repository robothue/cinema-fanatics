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

exports.getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ vote_average: -1 })
      .limit(10);

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No top-rated movies found." });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    res.status(500).json({
      message: "Failed to fetch top-rated movies.",
      error: error.message || "Unknown error"
    });
  }
};
