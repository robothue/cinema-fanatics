// routes/tmdb.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const TMDB_API = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

//All of these routes are for TMDB API
router.get("/featured", async (req, res) => {
  try {
    const fetchCategory = async (url, tag) => {
      const { data } = await axios.get(url, { params: { api_key: API_KEY, page: 1 } });
      return data.results.map(item => ({ ...item, tag }));
    };

    const categories = await Promise.all([
      fetchCategory(`${TMDB_API}/movie/top_rated`, "Top Rated Movie"),
      fetchCategory(`${TMDB_API}/tv/top_rated`, "Top Rated TV"),
      fetchCategory(`${TMDB_API}/trending/movie/week`, "Trending Movie"),
      fetchCategory(`${TMDB_API}/trending/tv/week`, "Trending TV"),
      fetchCategory(`${TMDB_API}/movie/popular`, "Popular Movie"),
      fetchCategory(`${TMDB_API}/tv/popular`, "Popular TV"),
    ]);

    const combined = categories.flat();
    const shuffled = combined.sort(() => Math.random() - 0.5);

    res.json(shuffled.slice(0, 60));
  } catch (err) {
    console.error("❌ Error fetching featured content:", err.message);
    res.status(500).json({ error: "Failed to fetch featured content." });
  }
});


router.get("/trending", async (req, res) => {
  try {
    const { data } = await axios.get(`${TMDB_API}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    res.json(data.results.slice(0, 60));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending movies." });
  }
});

router.get("/tv", async (req, res) => {
  try {
    const { data } = await axios.get(`${TMDB_API}/tv/popular`, {
      params: { api_key: API_KEY },
    });
    res.json(data.results.slice(0, 60));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TV shows." });
  }
});

// All Movies route in the server
router.get("/movies", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const { data } = await axios.get(`${TMDB_API}/discover/movie`, {
      params: {
        api_key: API_KEY,
        sort_by: req.query.sort_by || "popularity.desc",
        page,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies." });
  }
});


//Moviedetails.jsx
router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`${TMDB_API}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,credits,similar",
      },
    });

    res.json(data);
    console.log("Fetching watch providers for:", id);
  } catch (err) {
    console.error("❌ Error fetching TMDb movie by ID:", err.message);
    res.status(500).json({ error: "Failed to fetch movie details." });
  }
});

// Add this to your TMDB routes (routes/tmdb.js)
//This one is for service providers
router.get("/movie/:id/providers", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/movie/${id}/watch/providers`, {
      params: { api_key: API_KEY },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watch providers." });
  }
});

// This is routes for reviews in movie details page
router.get("/movie/:id/reviews", async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Get movie videos (for trailers, teasers, etc.)
router.get("/movie/:id/videos", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie videos." });
  }
});



module.exports = router;
