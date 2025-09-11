// routes/tmdb.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const TMDB_API = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

/**
 * ✅ Featured content
 */
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

/**
 * ✅ Trending Movies
 */
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

/**
 * ✅ Popular TV
 */
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


/**
 * ✅ TV Show Details
 */
router.get("/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(`${TMDB_API}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,credits,similar",
      },
    });
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching TMDb TV by ID:", err.message);
    res.status(500).json({ error: "Failed to fetch TV details." });
  }
});


/**
 * ✅ TV Watch Providers
 */
router.get("/tv/:id/providers", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/tv/${id}/watch/providers`, {
      params: { api_key: API_KEY },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TV watch providers." });
  }
});

/**
 * ✅ TV Reviews
 */
router.get("/tv/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/tv/${id}/reviews`, {
      params: { api_key: API_KEY },
    });
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch TV reviews" });
  }
});

/**
 * ✅ TV Videos (trailers, teasers, etc.)
 */
router.get("/tv/:id/videos", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/tv/${id}/videos`, {
      params: { api_key: API_KEY },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TV videos." });
  }
});




/**
 * ✅ Movies list
 */
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

/**
 * ✅ Movie Details
 */
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

/**
 * ✅ Watch Providers
 */
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

/**
 * ✅ Reviews
 */
router.get("/movie/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/movie/${id}/reviews`, {
      params: { api_key: API_KEY },
    });
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

/**
 * ✅ Videos (trailers, teasers, etc.)
 */
router.get("/movie/:id/videos", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${TMDB_API}/movie/${id}/videos`, {
      params: { api_key: API_KEY },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie videos." });
  }
});

/**
 * ✅ SEARCH ENDPOINTS
 */

// 🔍 Universal search (multi: movies, tv, people)
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query parameter is required" });

    const { data } = await axios.get(`${TMDB_API}/search/multi`, {
      params: { api_key: API_KEY, query, page: 1, include_adult: false },
    });

    // filter to only movie + tv
    const results = data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );

    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching search results:", err.message);
    res.status(500).json({ error: "Failed to fetch search results." });
  }
});

// 🔍 Movie-only search
router.get("/search/movie", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query parameter is required" });

    const { data } = await axios.get(`${TMDB_API}/search/movie`, {
      params: { api_key: API_KEY, query, include_adult: false },
    });

    res.json(data.results);
  } catch (err) {
    console.error("❌ Error searching movies:", err.message);
    res.status(500).json({ error: "Failed to search movies." });
  }
});

// 🔍 TV-only search
router.get("/search/tv", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query parameter is required" });

    const { data } = await axios.get(`${TMDB_API}/search/tv`, {
      params: { api_key: API_KEY, query },
    });

    res.json(data.results);
  } catch (err) {
    console.error("❌ Error searching TV shows:", err.message);
    res.status(500).json({ error: "Failed to search TV shows." });
  }
});

module.exports = router;
