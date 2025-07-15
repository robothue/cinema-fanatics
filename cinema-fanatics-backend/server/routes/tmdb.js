// routes/tmdb.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const TMDB_API = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

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

module.exports = router;
