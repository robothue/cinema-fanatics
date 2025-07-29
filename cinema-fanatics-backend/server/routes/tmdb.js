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
            const allResults = [];
        for (let i = 1; i <= 3; i++) {
          const { data } = await axios.get(`${TMDB_API}/movie/top_rated`, {
            params: { api_key: API_KEY, page: i },
          });
          allResults.push(...data.results);
        }
        res.json(allResults.slice(0, 60));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch featured movies." });
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



module.exports = router;
