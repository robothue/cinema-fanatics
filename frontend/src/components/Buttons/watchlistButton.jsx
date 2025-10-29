// src/components/Buttons/WatchlistButton.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function WatchlistButton({ movie, userId = "123" }) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if this movie is already in the user's watchlist
  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/watchlist/${userId}`);
        const found = res.data.some((item) => item.tmdbId === movie.id);
        setInWatchlist(found);
      } catch (err) {
        console.error("❌ Failed to fetch watchlist:", err);
      }
    };
    checkWatchlist();
  }, [movie.id, userId]);

  // ✅ Add to watchlist
  const handleAdd = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/watchlist", {
        userId,
        tmdbId: movie.id,
        title: movie.title,
        year: movie.release_date?.split("-")[0],
        rating: movie.vote_average,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        genre: movie.genres?.map((g) => g.name) || [],
        watched: false,
      });
      setInWatchlist(true);
    } catch (err) {
      console.error("❌ Error adding to watchlist:", err);
      alert("This movie might already be in your watchlist.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove from watchlist
  const handleRemove = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${userId}/${movie.id}`);
      setInWatchlist(false);
    } catch (err) {
      console.error("❌ Error removing from watchlist:", err);
      alert("Failed to remove from watchlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={inWatchlist ? handleRemove : handleAdd}
      disabled={loading}
      className={`transition text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-sm disabled:opacity-70 ${
        inWatchlist
          ? "bg-green-600 hover:bg-green-500"
          : "bg-indigo-600 hover:bg-indigo-500"
      }`}
    >
      {loading
        ? "Processing..."
        : inWatchlist
        ? "✓ In Watchlist"
        : "+ Add to Watchlist"}
    </button>
  );
}
