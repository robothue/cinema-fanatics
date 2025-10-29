// src/components/Buttons/WatchlistButton.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function WatchlistButton({
  movie,
  userId = "123",
  tmdbId,
  title,
  year,
  rating,
  posterUrl,
  genre,
  mediaType = "movie",
}) {
  // Allow flexibility: if no `movie` prop, use fallback values
  const id = movie?.id || tmdbId;
  const finalTitle = movie?.title || movie?.name || title;
  const finalYear =
    movie?.release_date?.split("-")[0] ||
    movie?.first_air_date?.split("-")[0] ||
    year;
  const finalRating = movie?.vote_average || rating;
  const finalPoster =
    movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : posterUrl;
  const finalGenre = movie?.genres?.map((g) => g.name) || genre || [];

  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const checkWatchlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/watchlist/${userId}`);
        const found = res.data.some((item) => item.tmdbId === id);
        setInWatchlist(found);
      } catch (err) {
        console.error("❌ Failed to fetch watchlist:", err);
      }
    };
    checkWatchlist();
  }, [id, userId]);

  const handleAdd = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/watchlist", {
        userId,
        tmdbId: id,
        title: finalTitle,
        year: finalYear,
        rating: finalRating,
        posterUrl: finalPoster,
        genre: finalGenre,
        mediaType,
        watched: false,
      });
      setInWatchlist(true);
    } catch (err) {
      console.error("❌ Error adding to watchlist:", err);
      alert("This item might already be in your watchlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${userId}/${id}`);
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
          : "bg-red-600 hover:bg-black"
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
